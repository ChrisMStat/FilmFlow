/*
contains the login AND register page
 */

import React, { useState } from "react"

export default function (props) {
    let [loginOption, setOption] = useState("signin")

    /* used to set whether to show the sign in or sign up forms */
    const loginModeChange = () => {
        setOption(loginOption === "signin" ? "signup" : "signin")
    }

    /* sign in form */
    if (loginOption === "signin") {
        return (
            <div className="Login-container">
                <form className="Login-form">
                    <div className="Login-form-content">
                        <h3 className="Login-form-title">Sign In</h3>
                        <div className="text-center">
                            Don't have an account?{" "}
                            <span className="link-primary" onClick={loginModeChange}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }

    /* sign up form */
    return (
        <div className="Login-container">
            <form className="Login-form">
                <div className="Login-form-content">
                    <h3 className="Login-form-title">Sign In</h3>
                    <div className="text-center">
                        Already have an account?{" "}
                        <span className="link-primary" onClick={loginModeChange}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="name"
                            className="form-control mt-1"
                            placeholder="e.g First Last"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )
}