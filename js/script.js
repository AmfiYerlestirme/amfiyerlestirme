let selectedGroup;
let color = "fill:#8fb9aa;stroke-width:4";
$(window).on("load", function () {
    const svgDoc = document.getElementById("lecture_hall").contentDocument;
    $(svgDoc).click(function (event) {
        if (event.target.tagName == "rect") {
            $(event.target).attr("style", color);
        };
    });
    $("#clear_button").click(function () {
        const seats = svgDoc.querySelectorAll("rect");
        seats.forEach(element => {
            element.setAttribute("style", "fill:#cccccc;stroke-width:4");
        });
    });
    $("#download_button").click(function () {
        const svgData = new XMLSerializer().serializeToString(svgDoc);
        const canvas = document.createElement("canvas");
        canvas.width = 1920;
        canvas.height = 1080;
        canvas.style.width = 1920;
        canvas.style.height = 1080;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(decodeURIComponent(encodeURIComponent(svgData))));
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const canvasdata = canvas.toDataURL("image/png", 1);
            const a = document.createElement("a");
            a.download = svgDoc.rootElement.id + ".png";
            a.href = canvasdata;
            document.body.appendChild(a);
            a.click();
        };
    });
    const buttons = document.querySelectorAll('input[name="group"]');
    Array.prototype.forEach.call(buttons, function (btn) {
        btn.addEventListener('change', function () {
            selectedGroup = this.value;
            console.log(selectedGroup);
            if (selectedGroup == "a") {
                color = "fill:#ff0000;stroke-width:4";
            } else if (selectedGroup == "b") {
                color = "fill:#0000ff;stroke-width:4";
            } else if (selectedGroup == "no_group") {
                color = "fill:#8fb9aa;stroke-width:4";
            } else if (selectedGroup == "empty") {
                color = "fill:#cccccc;stroke-width:4";
            };
        });
    });
});
