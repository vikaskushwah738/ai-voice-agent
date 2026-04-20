

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, mobile, phone, email, city, projectName } = body;



        if (Object.keys(errors).length > 0) {
            return Response.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors
                },
                { status: 400 }
            );
        }

        const lead = await leads.create({
            name: name.trim(),
            mobile,
            phone: phone || null,
            email: email.toLowerCase().trim(),
            city: city.trim(),
            projectName: projectName.trim()
        });

        return Response.json(
            {
                success: true,
                message: "Lead created successfully",
                data: lead
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Invalid request body"
            },
            { status: 500 }
        );
    }
}