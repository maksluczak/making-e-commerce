import React from "react";
import Card from "@/components/Auth/Card";
import RegistrationForm from "@/components/Auth/RegistrationForm";

export default function Register() {
    return (
        <section className="flex items-center pb-10">
            <Card>
                <RegistrationForm />
            </Card>
        </section>
    );
}
