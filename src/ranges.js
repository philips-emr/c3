c3_chart_internal_fn.initRanges = function () {
    var $$ = this;
    var config = $$.config;
    if (!config.data_ranges) {
        return;
    }

    var starter = config.data_starterRangeIndex;
    var range = config.data_ranges[starter].value;

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
        var value = this.value / parseFloat(this.max) * 100;
        var deslocation = (this.offsetHeight - 15) * value / 100 + 'px';
        var range = divVertical.select('.range');
        divVertical.select('.inverse-down').style('height', value + '%');
        range.style('bottom', value + '%');
        divVertical.select('span.thumb-down').style('bottom', deslocation);

        parent.select('input#down').attr('value', this.value);
        $$.verticalStartValue = this.value;

        var translate = $$.height - $$.verticalEndValue * ($$.height + 2) / this.max;
        var totalHeight = $$.height - $$.verticalStartValue * ($$.height + 2) / this.max - translate;
        $$.updateReferenceRange('.' + CLASS.REFERENCE_HORIZONTAL_RANGE, 'translate(0px, ' + translate + 'px)', totalHeight + 'px', null);
    });
    upInput.attr("id", 'up').attr('class', 'up').style('-webkit-appearance', 'slider-vertical').attr("value", range.verticalEndValue).attr('min', $$.y.domain()[0]).attr('max', $$.y.domain()[1]).attr('step', '0.1').attr('type', 'range').on('input', function () {
        var parent = $$.selectChart.select('.slider-vertical');
        var down = parent.select('#down');
        var divVertical = parent.select('div');
        this.value = Math.max(this.value, down.attr('value') - -0.1);
        var value = this.value / parseFloat(this.max) * 100;
        var deslocation = (this.offsetHeight - 15) * value / 100 + 'px';
        var range = divVertical.select('.range');
        divVertical.select('.inverse-up').style('height', 100 - value + '%');
        range.style('top', 100 - value + '%');
        divVertical.select('span.thumb-up').style('bottom', deslocation);

        parent.select('input#up').attr('value', this.value);
        $$.verticalEndValue = this.value;

        var translate = $$.height - $$.verticalEndValue * ($$.height + 2) / this.max;
        var totalHeight = $$.height - $$.verticalStartValue * ($$.height + 2) / this.max - translate;
        $$.updateReferenceRange('.' + CLASS.REFERENCE_HORIZONTAL_RANGE, 'translate(0px, ' + translate + 'px)', totalHeight + 'px', null);
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
    leftInput.attr("id", 'left').attr("class", 'left').attr("value", $$.x.domain()[0]).attr('min', $$.x.domain()[0]).attr('max', $$.x.domain()[1]).attr('step', '0.1').attr('type', 'range').on('input', function () {
        var parent = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal');

        var right = parent.select('#right');
        var divHorizontal = parent.select('div');
        this.value = Math.min(this.value, right.attr('value') - 0.1);
        var value = this.value / parseFloat(this.max) * 100;
        var deslocation = (this.offsetWidth - 15) * value / 100 + 'px';
        divHorizontal.select('.range').style('left', value + '%');
        divHorizontal.select('.inverse-left').style('width', value + '%');
        divHorizontal.select('span.thumb-left').style('left', deslocation);

        parent.select('input#left').attr('value', this.value);
        $$.horizontalStartValue = this.value;

        var translate = $$.horizontalStartValue * ($$.width + 2) / this.max;
        var totalWidth = $$.horizontalEndValue * ($$.width + 2) / this.max - translate;
        $$.updateReferenceRange('.' + CLASS.REFERENCE_VERTICAL_RANGE, 'translate(' + translate + 'px)', null, totalWidth + 'px');
    });
    rightInput.attr("id", 'right').attr("class", 'right').attr("value", $$.x.domain()[1]).attr('min', $$.x.domain()[0]).attr('max', $$.x.domain()[1]).attr('step', '0.1').attr('type', 'range').on('input', function () {
        var parent = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal');
        var left = parent.select('#left');
        var divHorizontal = parent.select('div');
        this.value = Math.max(this.value, left.attr('value') - -0.1);
        var value = this.value / parseFloat(this.max) * 100;
        var deslocation = (this.offsetWidth - 15) * value / 100 + 'px';
        var range = divHorizontal.select('.range');
        divHorizontal.select('.inverse-right').style('width', 100 - value + '%');
        range.style('right', 100 - value + '%');
        divHorizontal.select('span.thumb-right').style('left', deslocation);

        parent.select('input#right').attr('value', this.value);
        $$.horizontalEndValue = this.value;

        var translate = $$.horizontalStartValue * ($$.width + 2) / this.max;
        var totalWidth = $$.horizontalEndValue * ($$.width + 2) / this.max - translate;
        $$.updateReferenceRange('.' + CLASS.REFERENCE_VERTICAL_RANGE, 'translate(' + translate + 'px)', null, totalWidth + 'px');
    });
};

c3_chart_internal_fn.resizeRanges = function () {
    var $$ = this;

    if (!$$.config.data_ranges) {
        return;
    }

    var verticalRange = $$.selectChart.select("#slider-distance");
    verticalRange.style('height', $$.height + 'px');
    var divVertical = verticalRange.select("div");
    divVertical.select('.thumb-up').style('bottom', $$.height - 15 + 'px');
    $$.horizontalRange = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal').style('width', $$.width + 'px').style('left', $$.margin.left + 'px');
    var divHorizontal = $$.horizontalRange.select("div");
    divHorizontal.select('.thumb-right').style('left', $$.width - 15 + 'px');

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
    var range = config.data_ranges[index].value;

    $$.updateVerticalRange(range.verticalEndValue, range.verticalStartValue);
    $$.updateHorizontalRange(range.horizontalEndValue, range.horizontalStartValue);
};

c3_chart_internal_fn.updateHorizontalRange = function (horizontalEndValue, horizontalStartValue) {
    var $$ = this;
    $$.horizontalEndValue = horizontalEndValue;
    $$.horizontalStartValue = horizontalStartValue;
    var max = $$.x.domain()[1] - 1;
    var horizontalSlider = $$.d3.select('[graph-id="' + $$.config.bindto.replace('#', '') + '"] .slider-horizontal');
    var rightValue = horizontalEndValue / parseFloat(max) * 100;
    var rightDeslocation = ($$.width - 15) * rightValue / 100 + 'px';
    var leftValue = horizontalStartValue / parseFloat(max) * 100;
    var leftDeslocation = ($$.width - 15) * leftValue / 100 + 'px';
    var divHorizontal = horizontalSlider.select("div");

    var inverseLeft = divHorizontal.select('.inverse-left');
    var horizontalRange = divHorizontal.select('.range');

    divHorizontal.select('.inverse-right').style('width', 100 - rightValue + '%');
    inverseLeft.style('width', leftValue + '%');
    horizontalRange.style('right', 100 - rightValue + '%').style('left', leftValue + '%');
    divHorizontal.select('.thumb-right').style('left', rightDeslocation);
    divHorizontal.select('.thumb-left').style('left', leftDeslocation);
    horizontalSlider.select('input#right').attr('value', horizontalEndValue);
    horizontalSlider.select('input#left').attr('value', horizontalStartValue);

    var translate = horizontalStartValue * ($$.width + 2) / max;
    var totalWidth = horizontalEndValue * ($$.width + 2) / max - translate;
    $$.updateReferenceRange('.' + CLASS.REFERENCE_VERTICAL_RANGE, 'translate(' + translate + 'px)', null, totalWidth + 'px');
};

c3_chart_internal_fn.updateVerticalRange = function (verticalEndValue, verticalStartValue) {
    var $$ = this;
    $$.verticalStartValue = verticalStartValue;
    $$.verticalEndValue = verticalEndValue;
    var max = $$.y.domain()[1];
    var verticalSlider = $$.selectChart.select("#slider-distance");
    var upValue = verticalEndValue / parseFloat(max) * 100;
    var upDeslocation = ($$.height - 15) * upValue / 100 + 'px';
    var downValue = verticalStartValue / parseFloat(max) * 100;
    var downDeslocation = ($$.height - 15) * downValue / 100 + 'px';
    var divVertical = verticalSlider.select("div");

    var inverseUp = divVertical.select('.inverse-up');
    var verticalRange = divVertical.select('.range');

    inverseUp.style('height', 100 - upValue + '%');
    divVertical.select('.inverse-down').style('height', downValue + '%');
    verticalRange.style('top', 100 - upValue + '%').style('bottom', downValue + '%');
    divVertical.select('.thumb-up').style('bottom', upDeslocation);
    divVertical.select('.thumb-down').style('bottom', downDeslocation);
    verticalSlider.select('input#up').attr('value', verticalEndValue);
    verticalSlider.select('input#down').attr('value', verticalStartValue);

    var translate = $$.height - verticalEndValue * ($$.height + 2) / max;
    var totalHeight = $$.height - verticalStartValue * ($$.height + 2) / max - translate;
    $$.updateReferenceRange('.' + CLASS.REFERENCE_HORIZONTAL_RANGE, 'translate(0px, ' + translate + 'px)', totalHeight + 'px', null);
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

c3_chart_internal_fn.setRangeVisibility = function (visibility) {
    var divs = this.d3.selectAll('[graph-id="' + this.config.bindto.replace('#', '') + '"] .slider-vertical, .slider-horizontal, .c3-reference-vertical-range, .c3-reference-horizontal-range');
    divs.each(function () {
        this.classList.toggle("ng-hide", visibility);
    });
};
