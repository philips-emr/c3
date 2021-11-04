c3_chart_internal_fn.initRanges = function () {
    var $$ = this;
    var config = $$.config;
    if (!config.data_ranges || !Object.keys($$.config.data_ranges).length || !$$.config.data_starterRangeIndex) {
        return;
    }

    var starter = config.data_starterRangeIndex;
    var range = config.data_ranges[starter];

    if(!range){
        return;
    }

    var verticalRange = $$.selectChart.append("div").attr('class', 'slider-vertical').attr('id', "slider-distance").style('height', $$.height + 'px');
    var divVertical = verticalRange.append("div");
    divVertical.append("div").attr('class', 'inverse-down').style('height', '0%');
    divVertical.append("div").attr('class', 'inverse-up').style('height', '0%');
    divVertical.append("div").attr('class', 'range').style('top', '0%').style('bottom', '0%');
    divVertical.append("span").attr('class', 'thumb thumb-down').style('bottom', '0%');
    divVertical.append("span").attr('class', 'thumb thumb-up').style('bottom', $$.height - 15 + 'px');
    var downInput = verticalRange.append("input");
    var upInput = verticalRange.append("input");
    downInput.attr("id", 'down').attr('class', 'down').style('-webkit-appearance', 'slider-vertical').attr("value", range.verticalStartValue).attr('min', $$.y.domain()[0]).attr('max', $$.y.domain()[1]).attr('step', '0.1').attr('type', 'range').on('input', function () {
        var parent = $$.selectChart.select('.slider-vertical');
        var up = parent.select('#up');
        var divVertical = parent.select('div');

        this.value = Math.min(this.value, up.attr('value') - 0.1);
        parent.select('input#down').attr('value', this.value);
        $$.verticalStartValue = this.value;

        var results = $$.calculateHorizontalRangePosition(this.min, this.max);

        divVertical.select('.inverse-down').style('height', results.realHeight + 'px');
        divVertical.select('.range').style('bottom', results.realHeight + 'px');
        divVertical.select('span.thumb-down').style('bottom', results.buttonDown + 'px');

        $$.updateReferenceRange('.' + CLASS.REFERENCE_HORIZONTAL_RANGE, 'translate(0px, ' + results.translate + 'px)', results.totalHeight + 'px', null);
    });
    upInput.attr("id", 'up').attr('class', 'up').style('-webkit-appearance', 'slider-vertical').attr("value", range.verticalEndValue).attr('min', $$.y.domain()[0]).attr('max', $$.y.domain()[1]).attr('step', '0.1').attr('type', 'range').on('input', function () {
        var parent = $$.selectChart.select('.slider-vertical');
        var down = parent.select('#down');
        var divVertical = parent.select('div');

        this.value = Math.max(this.value, down.attr('value') - -0.1);
        parent.select('input#up').attr('value', this.value);
        $$.verticalEndValue = this.value;

        var results = $$.calculateHorizontalRangePosition(this.min, this.max);

        divVertical.select('.inverse-up').style('height', results.translate + 'px');
        divVertical.select('.range').style('top', results.translate + 'px');
        divVertical.select('span.thumb-up').style('bottom', results.buttonUp + 'px');

        $$.updateReferenceRange('.' + CLASS.REFERENCE_HORIZONTAL_RANGE, 'translate(0px, ' + results.translate + 'px)', results.totalHeight + 'px', null);
    });
    $$.horizontalRange = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal').style('width', $$.width + 'px').style('left', $$.margin.left + 'px').style('position', 'relative');
    $$.horizontalRange.selectAll('input').remove();
    $$.horizontalRange.selectAll('div').remove();
    var divHorizontal = $$.horizontalRange.append("div");
    divHorizontal.append("div").attr('class', 'inverse-left').style('width', '0%');
    divHorizontal.append("div").attr('class', 'inverse-right').style('width', '0%');
    divHorizontal.append("div").attr('class', 'range').style('right', '0%').style('left', '0%');
    divHorizontal.append("span").attr('class', 'thumb thumb-left').style('left', '0%');
    divHorizontal.append("span").attr('class', 'thumb thumb-right').style('left', $$.width - 15 + 'px');

    var leftInput = $$.horizontalRange.append("input");
    var rightInput = $$.horizontalRange.append("input");
    leftInput.attr("id", 'left').attr("class", 'left').attr("value", $$.x.domain()[0]).attr('min', $$.x.domain()[0]).attr('max', $$.x.domain()[1]-1).attr('step', '0.1').attr('type', 'range').on('input', function () {
        var parent = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal');
        var right = parent.select('#right');
        var divHorizontal = parent.select('div');

        this.value = Math.min(this.value, right.attr('value') - 0.1);
        parent.select('input#left').attr('value', this.value);
        $$.horizontalStartValue = this.value;

        var results = $$.calculateVerticalRangePosition(this.min, this.max);

        divHorizontal.select('.range').style('left', results.translate + 'px');
        divHorizontal.select('.inverse-left').style('width', results.translate + 'px');
        divHorizontal.select('span.thumb-left').style('left', results.buttonLeft + 'px');

        $$.updateReferenceRange('.' + CLASS.REFERENCE_VERTICAL_RANGE, 'translate(' + results.translate + 'px)', null, results.totalWidth + 'px');
    });
    rightInput.attr("id", 'right').attr("class", 'right').attr("value", $$.x.domain()[1]).attr('min', $$.x.domain()[0]).attr('max', $$.x.domain()[1]-1).attr('step', '0.1').attr('type', 'range').on('input', function () {
        var parent = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal');
        var left = parent.select('#left');
        var divHorizontal = parent.select('div');

        this.value = Math.max(this.value, left.attr('value') - -0.1);
        parent.select('input#right').attr('value', this.value);
        $$.horizontalEndValue = this.value;

        var results = $$.calculateVerticalRangePosition(this.min, this.max);

        divHorizontal.select('.inverse-right').style('width', results.rightValue + 'px');
        divHorizontal.select('.range').style('right', results.rightValue + 'px');
        divHorizontal.select('span.thumb-right').style('left', results.buttonRight + 'px');

        $$.updateReferenceRange('.' + CLASS.REFERENCE_VERTICAL_RANGE, 'translate(' + results.translate + 'px)', null, results.totalWidth + 'px');
    });
};

c3_chart_internal_fn.calculateHorizontalRangePosition = function (min, max) {
    var $$ = this;
    var factorEnd = max - min;
    var yToPercentEnd = ($$.verticalEndValue - $$.y.domain()[0]) * 100 / factorEnd;
    var resultEnd = $$.height * yToPercentEnd / 100;

    var factorStart = max - min;
    var yToPercentStart = ($$.verticalStartValue - $$.y.domain()[0]) * 100 / factorStart;
    var resultStart = $$.height * yToPercentStart / 100;

    var paddingValueUpButton = 15 * yToPercentEnd / 100;
    var paddingValueDownButton = 15 * yToPercentStart / 100;

    return {
        translate: $$.height - resultEnd,
        buttonUp: resultEnd - paddingValueUpButton,
        buttonDown: resultStart - paddingValueDownButton,
        totalHeight: resultEnd - resultStart,
        realHeight: resultStart,
    };
};

c3_chart_internal_fn.calculateVerticalRangePosition = function (min, max) {
    var $$ = this;
    var factorEnd = max - min;
    var xToPercentEnd = ($$.horizontalEndValue - min) * 100 / factorEnd;
    var resultEnd = $$.width * xToPercentEnd / 100;

    var factorStart = max - min;
    var xToPercentStart = ($$.horizontalStartValue - min) * 100 / factorStart;
    var resultStart = $$.width * xToPercentStart / 100;

    var paddingValueRightButton = 15 * xToPercentEnd / 100;
    var paddingValueLeftButton = 15 * xToPercentStart / 100;

    return {
        rightValue: $$.width - resultEnd,
        buttonRight: resultEnd - paddingValueRightButton,
        buttonLeft: resultStart - paddingValueLeftButton,
        translate: resultStart,
        totalWidth: resultEnd - resultStart
    };
};
c3_chart_internal_fn.resizeRanges = function () {
    var $$ = this;

    if (!$$.config.data_ranges || !Object.keys($$.config.data_ranges).length || !$$.config.data_starterRangeIndex) {
        return;
    }

    var verticalRange = $$.selectChart.select("#slider-distance");
    verticalRange.style('height', $$.height + 'px');
    $$.horizontalRange = $$.d3
        .select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal')
        .style('width', $$.width + 'px')
        .style('left', $$.margin.left + 'px');

    $$.setStartValuesRanges();
};

c3_chart_internal_fn.setStartValuesRanges = function () {
    var $$ = this;
    var config = $$.config;
    var starter = config.data_starterRangeIndex;
    $$.updateRange(starter);
};

c3_chart_internal_fn.updateRange = function (index) {
    var $$ = this;
    var config = $$.config;
    var range = config.data_ranges[index];

    if(!range){
        return;
    }

    $$.updateVerticalRange(range.verticalEndValue, range.verticalStartValue);
    $$.updateHorizontalRange(range.horizontalEndValue, range.horizontalStartValue);
};

c3_chart_internal_fn.updateHorizontalRange = function (horizontalEndValue, horizontalStartValue) {
    var $$ = this;
    $$.horizontalEndValue = horizontalEndValue;
    $$.horizontalStartValue = horizontalStartValue;
    var max = $$.x.domain()[1] - 1;
    var min = $$.x.domain()[0];
    var horizontalSlider = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal');
    var divHorizontal = horizontalSlider.select("div");

    var results = $$.calculateVerticalRangePosition(min, max);

    horizontalSlider.select('input#right').attr('value', horizontalEndValue);
    horizontalSlider.select('input#left').attr('value', horizontalStartValue);

    divHorizontal.select('.inverse-right').style('width', results.rightValue + 'px');
    divHorizontal.select('.range').style('right', results.rightValue + 'px');
    divHorizontal.select('span.thumb-right').style('left', results.buttonRight + 'px');

    divHorizontal.select('.range').style('left', results.translate + 'px');
    divHorizontal.select('.inverse-left').style('width', results.translate + 'px');
    divHorizontal.select('span.thumb-left').style('left', results.buttonLeft + 'px');

    $$.updateReferenceRange('.' + CLASS.REFERENCE_VERTICAL_RANGE, 'translate(' + results.translate + 'px)', null, results.totalWidth + 'px');
};

c3_chart_internal_fn.updateVerticalRange = function (verticalEndValue, verticalStartValue) {
    var $$ = this;
    $$.verticalStartValue = verticalStartValue;
    $$.verticalEndValue = verticalEndValue;
    var max = $$.y.domain()[1];
    var min = $$.y.domain()[0];
    var verticalSlider = $$.selectChart.select("#slider-distance");

    var divVertical = verticalSlider.select("div");

    var results = $$.calculateHorizontalRangePosition(min, max);

    divVertical.select('.inverse-down').style('height', results.realHeight + 'px');
    divVertical.select('.range').style('bottom', results.realHeight + 'px');
    divVertical.select('span.thumb-down').style('bottom', results.buttonDown + 'px');

    divVertical.select('.inverse-up').style('height', results.translate + 'px');
    divVertical.select('.range').style('top', results.translate + 'px');
    divVertical.select('span.thumb-up').style('bottom', results.buttonUp + 'px');

    $$.updateReferenceRange('.' + CLASS.REFERENCE_HORIZONTAL_RANGE, 'translate(0px, ' + results.translate + 'px)', results.totalHeight + 'px', null);
};

c3_chart_internal_fn.updateReferenceRange = function (htmlClass, translate, height, width) {
    var $$ = this;
    $$.selectChart.select(htmlClass + ' rect').style('transform', translate);
    if (height != null) {
        $$.selectChart.select(htmlClass + ' rect').style('height', height);
    } else if (width != null) {
        $$.selectChart.select(htmlClass + ' rect').style('width', width);
    }
};

c3_chart_internal_fn.setReferenceRange = function (index) {
    this.updateRange(index);
};

c3_chart_internal_fn.setVerticalRange = function (firstValue, secondValue) {
    var endValue = Math.max(firstValue, secondValue);
    var startValue = Math.min(firstValue, secondValue);

    this.updateVerticalRange(endValue, startValue);
};

c3_chart_internal_fn.setHorizontalRange = function (firstValue, secondValue) {
    var endValue = Math.max(firstValue, secondValue);
    var startValue = Math.min(firstValue, secondValue);

    this.updateHorizontalRange(endValue, startValue);
};

c3_chart_internal_fn.setRangeVisible = function (visible) {
    var divs = this.d3.selectAll('[graph-id="' + this.config.bindto.replace('#', '') + '"] .slider-vertical, .slider-horizontal, .c3-reference-vertical-range, .c3-reference-horizontal-range');
    divs.each(function () {
        this.classList.toggle("ng-hide", !visible);
    });
};
