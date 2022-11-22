import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import UserDislikedRow from "./UserDislikedRow";

export default function (props) {

    return (
        <div>
            <UserRow/>
            <UserDislikedRow/>
        </div>
    );
}