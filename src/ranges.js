c3_chart_internal_fn.initRanges = function () {
    var $$ = this;
    const verticalRange = $$.selectChart
        .append("div")
        .attr('slider-vertical', '')
        .attr('id', "slider-distance")
        .style('height', `${$$.height}px`);
    const divVertical = verticalRange.append("div");
    divVertical
        .append("div")
        .attr('inverse-down', '')
        .style('height', '0%');
    divVertical
        .append("div")
        .attr('inverse-up', '')
        .style('height', '0%');
    divVertical
        .append("div")
        .attr('range', '')
        .style('top', '0%')
        .style('bottom', '0%');
    divVertical
        .append("span")
        .attr('class', 'thumb-down')
        .attr('thumb', '')
        .style('bottom', '0%');
    divVertical
        .append("span")
        .attr('class', 'thumb-up')
        .attr('thumb', '')
        .style('bottom', `${$$.height - 15}px`);
    const downInput = verticalRange.append("input");
    const upInput = verticalRange.append("input");
    downInput
        .attr('class', 'down')
        .style('-webkit-appearance', 'slider-vertical')
        .attr("value", '0')
        .attr('min', '0')
        .attr('max', '100')
        .attr('step', '1')
        .attr('type', 'range')
        .on('input', function () {
            this.value = Math.min(this.value, this.parentNode.childNodes[2].value - 1);
            let value = (this.value / parseInt(this.max)) * 100;
            var children = this.parentNode.childNodes[0].childNodes;
            const deslocation = (this.offsetHeight - 15) * value / 100 + 'px';
            children[0].style.height = value + '%';
            children[2].style.bottom = value + '%';
            children[3].style.bottom = deslocation;
            $$.selectChart.select('.c3-reference-horizontal-range rect').style('transform', `translate(0px, ${children[1].offsetHeight - 5}px)`);
            $$.selectChart.select('.c3-reference-horizontal-range rect').style('height', `${children[2].offsetHeight}px`);
        });
    upInput
        .attr('class', 'up')
        .style('-webkit-appearance', 'slider-vertical')
        .attr("value", '100')
        .attr('min', '0')
        .attr('max', '100')
        .attr('step', '1')
        .attr('type', 'range')
        .on('input', function () {
            this.value = Math.max(this.value, this.parentNode.childNodes[1].value - (-1));
            let value = (this.value / parseInt(this.max)) * 100;
            var children = this.parentNode.childNodes[0].childNodes;
            const deslocation = (this.offsetHeight - 15) * value / 100 + 'px';
            children[1].style.height = (100 - value) + '%';
            children[2].style.top = (100 - value) + '%';
            children[4].style.bottom = deslocation;


            $$.selectChart.select('.c3-reference-horizontal-range rect').style('transform', `translate(0px, ${children[1].offsetHeight - 5}px)`);
            $$.selectChart.select('.c3-reference-horizontal-range rect').style('height', `${children[2].offsetHeight}px`);
        });
    $$.horizontalRange = $$.d3.select(`[graph-id="${$$.config.bindto.replace('#', '')}"] .horizontal-range`)
        .style('width', `${$$.width}px`)
        .style('left', `${$$.margin.left}px`)
        .style('position', 'relative');
    $$.horizontalRange.selectAll('input').remove()
    $$.horizontalRange.selectAll('div').remove()
    const divHorizontal = $$.horizontalRange.append("div");
    divHorizontal
        .append("div")
        .attr('inverse-left', '')
        .style('width', '0%');
    divHorizontal
        .append("div")
        .attr('inverse-right', '')
        .style('width', '0%');
    divHorizontal
        .append("div")
        .attr('range', '')
        .style('right', '0%')
        .style('left', '0%');
    divHorizontal
        .append("span")
        .attr('class', 'thumb-left')
        .attr('thumb', '')
        .style('left', '0%');
    divHorizontal
        .append("span")
        .attr('class', 'thumb-right')
        .attr('thumb', '')
        .style('left', `${$$.width - 15}px`);

    const leftInput = $$.horizontalRange.append("input");
    const rightInput = $$.horizontalRange.append("input");
    leftInput
        .attr("class", 'left')
        .attr("value", '0')
        .attr('min', '0')
        .attr('max', '100')
        .attr('step', '1')
        .attr('type', 'range')
        .on('input', function (id) {
            this.value = Math.min(this.value, this.parentNode.childNodes[2].value - 1);
            let value = (this.value / parseInt(this.max)) * 100;
            var children = this.parentNode.childNodes[0].childNodes;
            const deslocation = (this.offsetWidth - 15) * value / 100 + 'px';
            children[0].style.width = value + '%';
            children[2].style.left = value + '%';
            children[3].style.left = value + '%';
            children[3].style.left = deslocation;
            //reference range
            $$.selectChart.select('.c3-reference-vertical-range rect').style('transform', `translate(${children[0].offsetWidth - 5}px)`);
            $$.selectChart.select('.c3-reference-vertical-range rect').style('width', `${children[2].offsetWidth}px`);
        });
    rightInput.attr("value", '100')
        .attr("class", 'right')
        .attr('min', '0')
        .attr('max', '100')
        .attr('step', '1')
        .attr('type', 'range')
        .on('input', function () {
            this.value = Math.max(this.value, this.parentNode.childNodes[1].value - (-1));
            let value = (this.value / parseInt(this.max)) * 100;
            var children = this.parentNode.childNodes[0].childNodes;
            const deslocation = (this.offsetWidth - 15) * value / 100 + 'px';
            children[1].style.width = (100 - value) + '%';
            children[2].style.right = (100 - value) + '%';
            children[4].style.left = deslocation;
            //reference range
            $$.selectChart.select('.c3-reference-vertical-range rect').style('transform', `translate(${children[0].offsetWidth - 5}px)`);
            $$.selectChart.select('.c3-reference-vertical-range rect').style('width', `${children[2].offsetWidth}px`);
        });
}

c3_chart_internal_fn.resizeRanges = function () {
    var $$ = this;
    const verticalRange = $$.selectChart.select("#slider-distance");
    verticalRange.style('height', `${$$.height}px`);
    const divVertical = verticalRange.select("div");
    divVertical.select('.thumb-up').style('bottom', `${$$.height - 15}px`);
    $$.horizontalRange = $$.d3.select(`[graph-id="${$$.config.bindto.replace('#', '')}"] .horizontal-range`)
        .style('width', `${$$.width}px`)
        .style('left', `${$$.margin.left}px`);
    const divHorizontal = $$.horizontalRange.select("div");
    divHorizontal.select('.thumb-right').style('left', `${$$.width - 15}px`);
}
