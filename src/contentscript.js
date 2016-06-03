$(function() {
    var shareRatio = 0.95,
        techServFee = 0.1;
    function parsePrices(contentLines) {
        var values = [], match;
        $(contentLines).find(".number .yuan").each(function() {
            match = $(this).parent().text().match(/￥([\d,]+\.\d{2})/);
            if (match.length > 1) {
                values.push(match[1].replace(",", ""));
            }
        });
        return values.length != 2 ? [0,0] : values;
    }
    function process(el) {
        var list = $(el).find(".box-content");
        if (list.size() > 0) {
            $(list).each(function() {
                var contentLines = $(this).children(".content-line"),
                    results = parsePrices(contentLines),
                    price = parseFloat(results[0]),
                    commission = parseFloat(results[1]) * shareRatio,
                    value = String(Math.round((price - commission + (commission * techServFee)) * 100, 2)),
                    integerValue = value.substr(0, value.length-2),
                    decimalValue = value.substr(value.length-2, 2),
                    elem = $('<div class="content-line btn-brand"></div>');
                $(elem).html('<b>到手价</b>：￥<span class="number number-24">'
                        + '<span class="integer">' + (integerValue.length > 0 ? integerValue : '0') + '</span>'
                        + '<span class="pointer">.</span>'
                        + '<span class="decimal">' + decimalValue + '</span></span>');
                $(elem).insertBefore($(contentLines).eq(1));
                $(contentLines).last().remove();
            });
            $(el).addClass("hack-price");
        }
    }
    setInterval(function() {
        var el = $("#J_search_results");
        if (!$(el).hasClass("hack-price")) {
            process(el);
        }
    }, 500);
});
