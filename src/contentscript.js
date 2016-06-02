$(function() {
    function parsePrices(lines) {
        var results = [], match;
        $(lines).find(".number .yuan").each(function() {
            match = $(this).parent().text().match(/￥([\d,]+\.\d{2})/);
            if (match.length > 1) {
                results.push(match[1].replace(",", ""));
            }
        });
        return results;
    }
    function process(el) {
        var list = $(el).find(".box-content");
        if (list.size() > 0) {
            $(list).each(function() {
                var lines = $(this).children(".content-line"),
                    results = parsePrices(lines),
                    price = parseFloat(results[0]),
                    commission = parseFloat(results[1]),
                    resultValue = String(Math.round((price - (commission * 0.95)) * 100, 2)),
                    resultLine = $('<div class="content-line btn-brand"></div>');
                $(resultLine).html('<b>到手价</b>：￥<span class="number number-24">'
                        + '<span class="integer">' + resultValue.substr(0, resultValue.length-2) + '</span>'
                        + '<span class="pointer">.</span>'
                        + '<span class="decimal">' + resultValue.substr(resultValue.length-2, 2) + '</span></span>');
                console.info();
                $(resultLine).insertBefore($(lines).eq(1));
                $(lines).last().remove();
            });
            $(el).addClass("hack-price");
        }
    }
    setInterval(function() {
        var el = $("#J_search_results");
        if (!$(el).hasClass("hack-price")) {
            process(el);
        }
    }, 100);
});
