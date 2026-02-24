document.addEventListener('DOMContentLoaded', () => {
    const terminalText = document.getElementById('terminal-text');
    const terminalLines = [
        { text: "satya --init-agent", type: "command" },
        { text: "Booting Satya-Agent v2.0...", type: "system" },
        { text: "Analyzing core engine...", type: "system" },
        { text: "Stack: Python, Node.js, Kafka, LLMs.", type: "system" },
        { text: "Goal: Building the future of Agentic AI.", type: "success" },
        { text: "satya --status", type: "command" },
        { text: "Ready for high-scale challenges.", type: "system" }
        { text: "........", type: "system" }
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";

    function typeWriter() {
        if (lineIndex < terminalLines.length) {
            const line = terminalLines[lineIndex];

            if (charIndex === 0 && line.type !== "command") {
                // Instant system messages, or slight delay
                const newLine = document.createElement('div');
                newLine.className = `terminal-line ${line.type}`;
                if (line.type === "system") newLine.style.color = "#888";
                if (line.type === "success") newLine.style.color = "#FF5C00";

                newLine.innerHTML = line.text;
                document.getElementById('terminal-body').insertBefore(newLine, terminalText.parentElement);
                lineIndex++;
                setTimeout(typeWriter, 600);
            } else if (line.type === "command") {
                if (charIndex < line.text.length) {
                    terminalText.textContent += line.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Command finished typing
                    setTimeout(() => {
                        const finishedLine = document.createElement('div');
                        finishedLine.className = "terminal-line";
                        finishedLine.innerHTML = `<span class="prompt">satya@agent:~$</span> ${line.text}`;
                        document.getElementById('terminal-body').insertBefore(finishedLine, terminalText.parentElement);

                        terminalText.textContent = "";
                        charIndex = 0;
                        lineIndex++;
                        setTimeout(typeWriter, 400);
                    }, 800);
                }
            }
        } else {
            // Loop back or stay idle
            setTimeout(() => {
                // Clear and restart for continuous effect
                const terminalBody = document.getElementById('terminal-body');
                terminalBody.innerHTML = '<div class="terminal-line"><span class="prompt">satya@agent:~$</span> <span id="terminal-text"></span><span class="terminal-cursor"></span></div>';

                // Re-grab reference
                const newTerminalText = document.getElementById('terminal-text');

                // Reset indices
                lineIndex = 0;
                charIndex = 0;

                // Recursive call with different element reference
                function innerTypeWriter() {
                    if (lineIndex < terminalLines.length) {
                        const line = terminalLines[lineIndex];

                        if (charIndex === 0 && line.type !== "command") {
                            const newLine = document.createElement('div');
                            newLine.className = `terminal-line ${line.type}`;
                            if (line.type === "system") newLine.style.color = "#888";
                            if (line.type === "success") newLine.style.color = "#FF5C00";
                            newLine.innerHTML = line.text;
                            terminalBody.insertBefore(newLine, document.getElementById('terminal-text').parentElement);
                            lineIndex++;
                            setTimeout(innerTypeWriter, 600);
                        } else if (line.type === "command") {
                            const currentTarget = document.getElementById('terminal-text');
                            if (charIndex < line.text.length) {
                                currentTarget.textContent += line.text.charAt(charIndex);
                                charIndex++;
                                setTimeout(innerTypeWriter, 50);
                            } else {
                                setTimeout(() => {
                                    const finishedLine = document.createElement('div');
                                    finishedLine.className = "terminal-line";
                                    finishedLine.innerHTML = `<span class="prompt">satya@agent:~$</span> ${line.text}`;
                                    terminalBody.insertBefore(finishedLine, currentTarget.parentElement);
                                    currentTarget.textContent = "";
                                    charIndex = 0;
                                    lineIndex++;
                                    setTimeout(innerTypeWriter, 400);
                                }, 800);
                            }
                        }
                    } else {
                        // Re-trigger the whole loop
                        setTimeout(() => {
                            lineIndex = 0;
                            charIndex = 0;
                            terminalBody.innerHTML = '<div class="terminal-line"><span class="prompt">satya@agent:~$</span> <span id="terminal-text"></span><span class="terminal-cursor"></span></div>';
                            innerTypeWriter();
                        }, 5000);
                    }
                }
                innerTypeWriter();
            }, 5000);
        }
    }

    // Start with a small delay
    setTimeout(typeWriter, 1500);
});
