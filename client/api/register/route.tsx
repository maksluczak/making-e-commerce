export async function POST(request: Request) {
    const { firstName, lastName, email, password } = await request.json();

    const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
        }),
    });

    const data = await res.json();

    return Response.json({
        message: "Forwarded!",
        received: { firstName, lastName, email },
        remoteResponse: data,
    });
}
