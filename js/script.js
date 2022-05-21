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
        appendLegend(svgDoc);
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
    function appendLegend(svgDoc) {
        const gTag = svgDoc.getElementsByTagName("g")[0];
        const legendRectA = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        legendRectA.setAttribute("style", "fill:#ff0000;stroke-width:1.72032");
        legendRectA.setAttribute("id", "legend_rect_a");
        legendRectA.setAttribute("width", "30");
        legendRectA.setAttribute("height", "30");
        legendRectA.setAttribute("x", "1754.4463");
        legendRectA.setAttribute("y", "961.03424");

        const legendRectB = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        legendRectB.setAttribute("style", "fill:#0000ff;stroke-width:1.72032");
        legendRectB.setAttribute("id", "legend_rect_b");
        legendRectB.setAttribute("width", "30");
        legendRectB.setAttribute("height", "30");
        legendRectB.setAttribute("x", "1754.4463");
        legendRectB.setAttribute("y", "991.03424");

        const legendTextA = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        legendTextA.setAttribute("xml:space", "preserve");
        legendTextA.setAttribute("style", "font-style:normal;font-weight:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none");
        legendTextA.setAttribute("id", "legend_text_a");
        legendTextA.setAttribute("x", "1788.4463");
        legendTextA.setAttribute("y", "985.03424");

        var textNodeA = document.createTextNode("A");
        legendTextA.appendChild(textNodeA);

        const legendTextB = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        legendTextB.setAttribute("xml:space", "preserve");
        legendTextB.setAttribute("style", "font-style:normal;font-weight:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none");
        legendTextB.setAttribute("id", "legend_text_b");
        legendTextB.setAttribute("x", "1788.4463");
        legendTextB.setAttribute("y", "1015.0342");

        var textNodeB = document.createTextNode("B");
        legendTextB.appendChild(textNodeB);

        gTag.appendChild(legendRectA);
        gTag.appendChild(legendRectB);
        gTag.appendChild(legendTextA);
        gTag.appendChild(legendTextB);
    }
});
