import React from "react";
import Card from "@/components/Auth/Card";
import LoginForm from "@/components/Auth/LoginForm";

export default function Login() {
    return (
        <section className="flex items-center pb-10">
            <Card>
                <LoginForm />
            </Card>
        </section>
    );
}
