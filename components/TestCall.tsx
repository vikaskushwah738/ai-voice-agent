"use client";

export default function DemoCallButton() {
    const handleCall = async () => {
        const res = await fetch("/api/test-demo-call", {
            method: "POST",
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
            alert("Demo call triggered");
        } else {
            alert(`Call failed: ${data.error}`);
        }
    };

    return (
        <button onClick={handleCall} className="px-4 py-2 rounded bg-black text-white">
            Test Demo Call
        </button>
    );
}