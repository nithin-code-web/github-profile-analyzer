const axios = require("axios");
const prisma = require("../config/db");

const mapProfileResponse = (profile) => ({
    id: profile.id,
    username: profile.username,
    name: profile.name,
    bio: profile.bio,
    followers: profile.followers,
    following: profile.following,
    public_repos: profile.publicRepos,
    avatar_url: profile.avatarUrl,
    github_url: profile.githubUrl,
    company: profile.company,
    location: profile.location,
    account_created_at: profile.accountCreatedAt,
    profile_score: profile.profileScore,
    analyzed_at: profile.analyzedAt
});

const findProfileByUsername = (username) => {
    return prisma.githubProfile.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        }
    });
};

exports.analyzeProfile = async (req, res) => {
    const username = req.params.username?.trim();

    if (!username) {
        return res.status(400).json({
            success: false,
            message: "GitHub username is required"
        });
    }

    try {
        const existingProfile = await findProfileByUsername(username);

        if (existingProfile) {
            return res.status(200).json({
                success: true,
                source: "database",
                data: mapProfileResponse(existingProfile)
            });
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        const {
            login,
            name,
            bio,
            followers,
            following,
            public_repos,
            avatar_url,
            html_url,
            company,
            location,
            created_at
        } = response.data;

        const profileScore = (followers * 2) + (public_repos * 5);

        const createdProfile = await prisma.githubProfile.create({
            data: {
                username: login,
                name,
                bio,
                followers,
                following,
                publicRepos: public_repos,
                avatarUrl: avatar_url,
                githubUrl: html_url,
                company,
                location,
                accountCreatedAt: new Date(created_at),
                profileScore
            }
        });

        return res.status(201).json({
            success: true,
            source: "GitHub API",
            data: mapProfileResponse(createdProfile)
        });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).json({
                success: false,
                message: "GitHub user not found"
            });
        }

        if (error.code === "P2002") {
            const profile = await findProfileByUsername(username);

            if (!profile) {
                return res.status(409).json({
                    success: false,
                    message: "Profile already exists but could not be loaded"
                });
            }

            return res.status(200).json({
                success: true,
                source: "database",
                data: mapProfileResponse(profile)
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error analyzing GitHub profile",
            error: error.message
        });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await prisma.githubProfile.findMany({
            orderBy: [
                { profileScore: "desc" },
                { analyzedAt: "desc" }
            ]
        });

        return res.status(200).json({
            success: true,
            count: profiles.length,
            data: profiles.map(mapProfileResponse)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching analyzed profiles",
            error: error.message
        });
    }
};

exports.getProfileByUsername = async (req, res) => {
    const username = req.params.username?.trim();

    if (!username) {
        return res.status(400).json({
            success: false,
            message: "GitHub username is required"
        });
    }

    try {
        const profile = await findProfileByUsername(username);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found in database"
            });
        }

        return res.status(200).json({
            success: true,
            data: mapProfileResponse(profile)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: error.message
        });
    }
};
