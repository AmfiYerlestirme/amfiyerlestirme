let selectedGroup;
let reds;
let blues;
let total;
let color = "fill:#8fb9aa;stroke-width:4";
$(window).on("load", function () {
    const svgDoc = document.getElementById("lecture_hall").contentDocument;
    $(svgDoc).click(function (event) {
        if (event.target.tagName == "rect") {
            $(event.target).attr("style", color);
            countColors();
        };
    });
    $("#clear_button").click(function () {
        const seats = svgDoc.querySelectorAll("rect");
        seats.forEach(element => {
            element.setAttribute("style", "fill:#cccccc;stroke-width:4");
        });
        countColors();
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
        setAttributes(legendRectA, {
            "style": "fill:#ff0000;stroke-width:1.72032", "id": "legend_rect_a", "width": "30", "height": "30",
            "x": "1754.4463",
            "y": "961.03424"
        });

        const legendRectB = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        setAttributes(legendRectB, {
            "style": "fill:#0000ff;stroke-width:1.72032",
            "id": "legend_rect_b",
            "width": "30",
            "height": "30",
            "x": "1754.4463",
            "y": "991.03424"
        });

        const legendTextA = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        setAttributes(legendTextA, {
            "xml:space": "preserve",
            "style": "font-style:normal;font-weight:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none",
            "id": "legend_text_a",
            "x": "1788.4463",
            "y": "985.03424"
        });

        const textNodeA = document.createTextNode("A");
        legendTextA.appendChild(textNodeA);

        const legendTextB = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        setAttributes(legendTextB, {
            "xml:space": "preserve",
            "style": "font-style:normal;font-weight:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none",
            "id": "legend_text_b",
            "x": "1788.4463",
            "y": "1015.0342"
        });

        const textNodeB = document.createTextNode("B");
        legendTextB.appendChild(textNodeB);

        gTag.appendChild(legendRectA);
        gTag.appendChild(legendRectB);
        gTag.appendChild(legendTextA);
        gTag.appendChild(legendTextB);
    }
    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
    function countColors() {
        let a;
        let b;
        let total;
        reds = $(svgDoc).find("rect[style='fill:#ff0000;stroke-width:4']").length;
        blues = $(svgDoc).find("rect[style='fill:#0000ff;stroke-width:4']").length;
        if (reds || blues) {
            a = reds;
            b = blues;
            total = reds + blues;
        } else {
            a = "";
            b = "";
            total = $(svgDoc).find("rect[style='fill:#8fb9aa;stroke-width:4']").length;
        }
        displayCounts(a, b, total);
    }
    function displayCounts(a, b, total) {
        const gTag = svgDoc.getElementsByTagName("g")[0];
        if ($(gTag).find("#counts_text")) {
            const childrenToBeRemoved = $(gTag).find("#counts_text");
            $.each(childrenToBeRemoved, function () {
                this.remove();
            })
        };
        const countsText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        setAttributes(countsText, {
            "xml:space": "preserve",
            "style": "font-style:normal;font-weight:normal;font-size:26.6667px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none",
            "id": "counts_text",
            "x": "896.48303",
            "y": "820.10522"
        });

        const aTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        setAttributes(aTspan, {
            "sodipodi:role": "line",
            "x": "896.48303",
            "y": "820.10522"
        });
        countsText.appendChild(aTspan);
        aTspan.innerHTML = "A: " + a;

        const bTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        setAttributes(bTspan, {
            "sodipodi:role": "line",
            "x": "896.48303",
            "y": "853.4386"
        });
        countsText.appendChild(bTspan);
        bTspan.innerHTML = "B: " + b;

        const totalTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        setAttributes(totalTspan, {
            "sodipodi:role": "line",
            "x": "896.48303",
            "y": "886.77197"
        });
        countsText.appendChild(totalTspan);
        totalTspan.innerHTML = "Toplam: " + total;

        gTag.appendChild(countsText);
    };
});
