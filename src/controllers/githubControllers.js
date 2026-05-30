const axios = require("axios");
const connection = require("../config/db");


exports.analyzeProfile = async (req,res) => {
    try{
        const username = req.params.username;

        connection.query(
            "SELECT * FROM github_profiles WHERE username = ?",
            [username],
            async (err, results) => {

                if(err) {
                    return res.status(500).json({
                        success:false,
                        message: "Database query error"
                    });
                }

                if(results.length > 0) {
                    return res.status(200).json({
                        success : true,
                        source : "database",
                        data : results[0]
                    });
                }


                let response;

                try{
                    response = await axios.get(`https://api.github.com/users/${username}`);

                }catch(apiError) {
                    if(apiError.response && apiError.response.status === 404) {
                        return res.status(404).json({
                            success : false,
                            message : "GitHub user not found"
                        })
                    }
                    return res.status(500).json({
                        success : false,
                        message : "GitHub API error"
                    })
                }

                const githubData = response.data;

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
                } = githubData;

                const profileScore = (followers * 2) + (public_repos * 5);

                const insertQuery = "INSERT INTO github_profiles (username, name, bio, followers, following, public_repos, avatar_url, github_url,company, location, account_created_at, profile_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                connection.query(
                    insertQuery,
                    [login, name, bio, followers, following, public_repos, avatar_url, html_url, company, location, created_at, profileScore],
                    (insertErr, insertResults) => {

                        if(insertErr) {
                            return res.status(500).json({
                                success:false,
                                message: "Database insertion error"
                            });
                        }

                        if(insertResults.affectedRows > 0) {
                            return res.status(201).json({
                                success : true,
                                source : "GitHub API",
                                data : {
                                    username: login,
                                    name: name,
                                    bio: bio,
                                    followers: followers,
                                    following: following,
                                    public_repos: public_repos,
                                    avatar_url: avatar_url,
                                    github_url: html_url,
                                    company: company,
                                    location: location,
                                    account_created_at: created_at,
                                    profile_score: profileScore
                                }
                            });
                        } else {
                            return res.status(500).json({
                                success : false,
                                message : "Failed to save profile data"
                            })
                        }

                    }
                )
            }
        )

    } catch(error) {

        res.status(500).json({
            success:false,
            message: "Error analyzing GitHub profile",
            error: error.message
        });
    }
    
} 

exports.getAllProfiles = (req,res) => {
    connection.query(
        "SELECT * FROM github_profiles ORDER BY profile_score DESC",
        (err,results) => {
            if(err) {
                return res.status(500).json({
                    success : false,
                    message : "Database query error"
                });
            }
            res.status(200).json({
                success : true,
                count : results.length,
                data : results
            });
        }
    )
}

exports.getProfileByUsername = (req,res) => {
    const username = req.params.username;
    connection.query(
        "SELECT * FROM github_profiles WHERE username = ?",
        [username],
        (err,results) => {
            if(err) {
                return res.status(500).json({
                    success : false,
                    message : "database query error"
                });
            }
            if(results.length > 0) {
                return res.status(200).json({
                    success : true,
                    data : results[0]
                })
            } else {
                return res.status(404).json({
                    success : false,
                    message : "Profile not found in database"
                })
            }
        }
    )
}

