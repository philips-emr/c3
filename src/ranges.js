c3_chart_internal_fn.initRanges = function () {
    const $$ = this;
    const config = $$.config;

    if(!config.data_ranges){
        return;
    }

    const starter = config.data_starterRangeIndex;
    const range = config.data_ranges[starter].value;

    const verticalRange = $$.selectChart
        .append("div")
        .attr('class', 'slider-vertical')
        .attr('id', "slider-distance")
        .style('height', `${$$.height}px`);
    const divVertical = verticalRange.append("div");
    divVertical
        .append("div")
        .attr('class', 'inverse-down')
        .style('height', '0%');
    divVertical
        .append("div")
        .attr('class', 'inverse-up')
        .style('height', '0%');
    divVertical
        .append("div")
        .attr('class', 'range')
        .style('top', '0%')
        .style('bottom', '0%');
    divVertical
        .append("span")
        .attr('class', 'thumb thumb-down')
        .style('bottom', '0%');
    divVertical
        .append("span")
        .attr('class', 'thumb thumb-up')
        .style('bottom', `${$$.height - 15}px`);
    const downInput = verticalRange.append("input");
    const upInput = verticalRange.append("input");
    downInput
        .attr("id", 'down')
        .attr('class', 'down')
        .style('-webkit-appearance', 'slider-vertical')
        .attr("value", range.verticalStartValue)
        .attr('min', $$.y.domain()[0])
        .attr('max', $$.y.domain()[1])
        .attr('step', '0.1')
        .attr('type', 'range')
        .on('input', function () {
            const parent = $$.selectChart.select('.slider-vertical');
            const up = parent.select('#up');
            const divVertical = parent.select('div');
            this.value = Math.min(this.value, up.attr('value') - 0.1);
            let value = (this.value / parseFloat(this.max)) * 100;
            const deslocation = (this.offsetHeight - 15) * value / 100 + 'px';
            const range = divVertical.select('.range');
            const inverseUp = divVertical.select('.inverse-up').node();
            divVertical.select('.inverse-down').style('height', value + '%');
            range.style('bottom', value + '%');
            divVertical.select('span.thumb-down').style('bottom', deslocation);

            parent.select('input#down').attr('value', this.value);
            $$.verticalStartValue = this.value;

            const translate = $$.height - ($$.verticalEndValue * ($$.height + 2) / this.max);
            const totalHeight = $$.height - ($$.verticalStartValue * ($$.height + 2) / this.max) - translate;
            $$.updateReferenceRange(`.${CLASS.REFERENCE_HORIZONTAL_RANGE}`, `translate(0px, ${translate}px)`, `${totalHeight}px`, null);
        });
    upInput
        .attr("id", 'up')
        .attr('class', 'up')
        .style('-webkit-appearance', 'slider-vertical')
        .attr("value", range.verticalEndValue)
        .attr('min', $$.y.domain()[0])
        .attr('max', $$.y.domain()[1])
        .attr('step', '0.1')
        .attr('type', 'range')
        .on('input', function () {
            const parent = $$.selectChart.select('.slider-vertical');
            const down = parent.select('#down');
            const divVertical = parent.select('div');
            this.value = Math.max(this.value, down.attr('value') - (-0.1));
            let value = (this.value / parseFloat(this.max)) * 100;
            const deslocation = (this.offsetHeight - 15) * value / 100 + 'px';
            const range = divVertical.select('.range');
            const inverseUp = divVertical.select('.inverse-up').style('height', (100 - value) + '%');
            range.style('top', (100 - value) + '%');
            divVertical.select('span.thumb-up').style('bottom', deslocation);

            parent.select('input#up').attr('value', this.value);
            $$.verticalEndValue = this.value;

            const translate = $$.height - ($$.verticalEndValue * ($$.height + 2) / this.max);
            const totalHeight = $$.height - ($$.verticalStartValue * ($$.height + 2) / this.max) - translate;
            $$.updateReferenceRange(`.${CLASS.REFERENCE_HORIZONTAL_RANGE}`, `translate(0px, ${translate}px)`, `${totalHeight}px`, null);
        });
    $$.horizontalRange = $$.d3.select(`[graph-id="${$$.config.bindto.replace('#', '')}"] .slider-horizontal`)
        .style('width', `${$$.width}px`)
        .style('left', `${$$.margin.left}px`)
        .style('position', 'relative');
    $$.horizontalRange.selectAll('input').remove()
    $$.horizontalRange.selectAll('div').remove()
    const divHorizontal = $$.horizontalRange.append("div");
    divHorizontal
        .append("div")
        .attr('class', 'inverse-left')
        .style('width', '0%');
    divHorizontal
        .append("div")
        .attr('class', 'inverse-right')
        .style('width', '0%');
    divHorizontal
        .append("div")
        .attr('class', 'range')
        .style('right', '0%')
        .style('left', '0%');
    divHorizontal
        .append("span")
        .attr('class', 'thumb thumb-left')
        .style('left', '0%');
    divHorizontal
        .append("span")
        .attr('class', 'thumb thumb-right')
        .style('left', `${$$.width - 15}px`);

    const leftInput = $$.horizontalRange.append("input");
    const rightInput = $$.horizontalRange.append("input");
    leftInput
        .attr("id", 'left')
        .attr("class", 'left')
        .attr("value", $$.x.domain()[0])
        .attr('min', $$.x.domain()[0])
        .attr('max', $$.x.domain()[1])
        .attr('step', '0.1')
        .attr('type', 'range')
        .on('input', function () {
            const parent = $$.d3.select(`[graph-id="${$$.config.bindto.replace('#', '')}"] .slider-horizontal`);

            const right = parent.select('#right');
            const divHorizontal = parent.select('div');
            this.value = Math.min(this.value, right.attr('value') - 0.1);
            let value = (this.value / parseFloat(this.max)) * 100;
            const deslocation = (this.offsetWidth - 15) * value / 100 + 'px';
            const range = divHorizontal.select('.range').style('left', value + '%');
            const inverseLeft = divHorizontal.select('.inverse-left').style('width', value + '%');
            divHorizontal.select('span.thumb-left').style('left', deslocation);

            parent.select('input#left').attr('value', this.value);
            $$.horizontalStartValue = this.value;

            const translate = $$.horizontalStartValue * ($$.width + 2) / this.max;
            const totalWidth = ($$.horizontalEndValue * ($$.width + 2) / this.max) - translate;
            $$.updateReferenceRange(`.${CLASS.REFERENCE_VERTICAL_RANGE}`, `translate(${translate}px)`, null, `${totalWidth}px`);
            // $$.updateReferenceRange(`.${CLASS.REFERENCE_VERTICAL_RANGE}`, `translate(${inverseLeft.node().getBoundingClientRect().width}px)`, null, `${range.node().getBoundingClientRect().width}px`);
        });
    rightInput
        .attr("id", 'right')
        .attr("class", 'right')
        .attr("value", $$.x.domain()[1])
        .attr('min', $$.x.domain()[0])
        .attr('max', $$.x.domain()[1])
        .attr('step', '0.1')
        .attr('type', 'range')
        .on('input', function () {
            const parent = $$.d3.select(`[graph-id="${$$.config.bindto.replace('#', '')}"] .slider-horizontal`);
            const left = parent.select('#left');
            const divHorizontal = parent.select('div');
            this.value = Math.max(this.value, left.attr('value') - (-0.1));
            let value = (this.value / parseFloat(this.max)) * 100;
            const deslocation = (this.offsetWidth - 15) * value / 100 + 'px';
            const range = divHorizontal.select('.range');
            divHorizontal.select('.inverse-right').style('width', (100 - value) + '%');
            range.style('right', (100 - value) + '%');
            divHorizontal.select('span.thumb-right').style('left', deslocation);

            parent.select('input#right').attr('value', this.value);
            const inverseLeft = divHorizontal.select('.inverse-left');
            $$.horizontalEndValue = this.value;

            const translate = $$.horizontalStartValue * ($$.width + 2) / this.max;
            const totalWidth = ($$.horizontalEndValue * ($$.width + 2) / this.max) - translate;
            $$.updateReferenceRange(`.${CLASS.REFERENCE_VERTICAL_RANGE}`, `translate(${translate}px)`, null, `${totalWidth}px`);
            // $$.updateReferenceRange(`.${CLASS.REFERENCE_VERTICAL_RANGE}`, `translate(${inverseLeft.node().getBoundingClientRect().width}px)`, null, `${range.node().getBoundingClientRect().width}px`);
        });
};

c3_chart_internal_fn.resizeRanges = function () {
    const $$ = this;
    if(!$$.config.data_ranges){
        return;
    }
    const verticalRange = $$.selectChart.select("#slider-distance");
    verticalRange.style('height', `${$$.height}px`);
    const divVertical = verticalRange.select("div");
    divVertical.select('.thumb-up').style('bottom', `${$$.height - 15}px`);
    $$.horizontalRange = $$.d3.select(`[graph-id="${$$.config.bindto.replace('#', '')}"] .slider-horizontal`)
        .style('width', `${$$.width}px`)
        .style('left', `${$$.margin.left}px`);
    const divHorizontal = $$.horizontalRange.select("div");
    divHorizontal.select('.thumb-right').style('left', `${$$.width - 15}px`);

    $$.setStartValuesRanges();
};

c3_chart_internal_fn.setStartValuesRanges = function () {
    const $$ = this;
    const config = $$.config;
    const starter = config.data_starterRangeIndex;
    $$.updateRange(starter);
};

c3_chart_internal_fn.updateRange = function (index) {
    const $$ = this;
    const config = $$.config;
    const range = config.data_ranges[index].value;

    $$.updateVerticalRange(range.verticalEndValue, range.verticalStartValue);
    $$.updateHorizontalRange(range.horizontalEndValue, range.horizontalStartValue);
};

c3_chart_internal_fn.updateHorizontalRange = function (horizontalEndValue, horizontalStartValue) {
    const $$ = this;
    $$.horizontalEndValue = horizontalEndValue;
    $$.horizontalStartValue = horizontalStartValue;
    const max = $$.x.domain()[1] - 1;
    const horizontalSlider = $$.d3.select(`[graph-id="${$$.config.bindto.replace('#', '')}"] .slider-horizontal`);
    const rightValue = (horizontalEndValue / parseFloat(max)) * 100;
    const rightDeslocation = ($$.width - 15) * rightValue / 100 + 'px';
    const leftValue = (horizontalStartValue / parseFloat(max)) * 100;
    const leftDeslocation = ($$.width - 15) * leftValue / 100 + 'px';
    const divHorizontal = horizontalSlider.select("div");

    const inverseLeft = divHorizontal.select('.inverse-left');
    const horizontalRange = divHorizontal.select('.range');

    divHorizontal.select('.inverse-right').style('width', `${100 - rightValue}%`);
    inverseLeft.style('width', `${leftValue}%`);
    horizontalRange.style('right', `${100 - rightValue}%`).style('left', `${leftValue}%`);
    divHorizontal.select('.thumb-right').style('left', rightDeslocation);
    divHorizontal.select('.thumb-left').style('left', leftDeslocation);
    horizontalSlider.select('input#right').attr('value', horizontalEndValue);
    horizontalSlider.select('input#left').attr('value', horizontalStartValue);

    const translate = horizontalStartValue * ($$.width + 2) / max;
    const totalWidth = (horizontalEndValue * ($$.width + 2) / max) - translate;
    $$.updateReferenceRange(`.${CLASS.REFERENCE_VERTICAL_RANGE}`, `translate(${translate}px)`, null, `${totalWidth}px`);
};

c3_chart_internal_fn.updateVerticalRange = function (verticalEndValue, verticalStartValue) {
    const $$ = this;
    $$.verticalStartValue = verticalStartValue;
    $$.verticalEndValue = verticalEndValue;
    const max = $$.y.domain()[1];
    const verticalSlider = $$.selectChart.select("#slider-distance");
    const upValue = (verticalEndValue / parseFloat(max)) * 100;
    const upDeslocation = ($$.height - 15) * upValue / 100 + 'px';
    const downValue = (verticalStartValue / parseFloat(max)) * 100;
    const downDeslocation = ($$.height - 15) * downValue / 100 + 'px';
    const divVertical = verticalSlider.select("div");

    const inverseUp = divVertical.select('.inverse-up');
    const verticalRange = divVertical.select('.range');

    inverseUp.style('height', `${100 - upValue}%`);
    divVertical.select('.inverse-down').style('height', `${downValue}%`);
    verticalRange.style('top', `${100 - upValue}%`).style('bottom', `${downValue}%`);
    divVertical.select('.thumb-up').style('bottom', upDeslocation);
    divVertical.select('.thumb-down').style('bottom', downDeslocation);
    verticalSlider.select('input#up').attr('value', verticalEndValue);
    verticalSlider.select('input#down').attr('value', verticalStartValue);

    const translate = $$.height - (verticalEndValue * ($$.height + 2) / max);
    const totalHeight = $$.height - (verticalStartValue * ($$.height + 2) / max) - translate;
    $$.updateReferenceRange(`.${CLASS.REFERENCE_HORIZONTAL_RANGE}`, `translate(0px, ${translate}px)`, `${totalHeight}px`, null);
};

c3_chart_internal_fn.updateReferenceRange = function (htmlClass, translate, height, width) {
    const $$ = this;
    $$.selectChart.select(`${htmlClass} rect`).style('transform', translate);
    if (height != null) {
        $$.selectChart.select(`${htmlClass} rect`).style('height', height);
    } else if (width != null) {
        $$.selectChart.select(`${htmlClass} rect`).style('width', width);
    }
};

c3_chart_internal_fn.setReferenceRange = function (index) {
    this.updateRange(index);
};

c3_chart_internal_fn.setVerticalRange = function (firstValue, secondValue) {
    const endValue = Math.max(firstValue, secondValue);
    const startValue = Math.min(firstValue, secondValue);

    this.updateVerticalRange(endValue, startValue);
};

c3_chart_internal_fn.setHorizontalRange = function (firstValue, secondValue) {
    const endValue = Math.max(firstValue, secondValue);
    const startValue = Math.min(firstValue, secondValue);

    this.updateHorizontalRange(endValue, startValue);
};

c3_chart_internal_fn.setRangeVisibility = function (visibility) {
    const divs = this.d3.selectAll(`[graph-id="${this.config.bindto.replace('#', '')}"] .slider-vertical, .slider-horizontal, .c3-reference-vertical-range, .c3-reference-horizontal-range`);
    divs.each(function () {
        this.classList.toggle("ng-hide", visibility);
    });
};
