/* User's Profile Page */

import React from "react";
import UserRow from "./UserRow";
import UserDislikedRow from "./UserDislikedRow";
import RecRow from "./RecRow";

export default function (props) {
    return (

        <div>
            <UserRow/>
            <UserDislikedRow/>
            <RecRow/>
        </div>
    );
}