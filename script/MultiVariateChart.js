
/*--------------------------------------------------------------------------------------------
	Defining function for rendering chart.
	This function is the starting point of Renderining visual elements.
----------------------------------------------------------------------------------------------
*/

//	@entireChartObject is an input parameter of internal chart Object.
function renderEngine(entireChartObject)
	{
		var screenHight = document.getElementById("entireChart").offsetHeight;
	var screenWidth = document.getElementById("entireChart").offsetWidth;
	var multiChartWidth= entireChartObject.chartobject.chartWidth;
	var multiChartHeight= entireChartObject.chartobject.chartHeight;
	var numOfChartRowWise = Math.floor(screenWidth/multiChartWidth);
	var numOfChartColumnWise = Math.floor(screenHight/multiChartHeight);
	var numOfCharts = entireChartObject.chartobject.plot.length;
	var evenOdd =true;
	var divisionValue=numOfCharts/numOfChartRowWise;
	if((divisionValue-Math.floor(divisionValue))!==0)
	{
		evenOdd=false;
	} 
	else
		evenOdd=true;
	//console.log(entireChartObject);
	var computedChartObject=entireChartObject;
	
	//Getting caption value.
	var caption = computedChartObject.chartobject.chartCaption;
	//Getting sub-caption value.
	var subCaption = computedChartObject.chartobject.chartSubCption;
	//Rendering Caption and sub caption.
	document.getElementById("caption").innerHTML=caption;
	document.getElementById("subcaption").innerHTML=subCaption;
	var chartType = computedChartObject.chartobject.chartType;
	console.log(chartType);
	if(chartType==="line")
	{
	//Rendering graphical elements according to the number of chart created from internal data structure.
	renderLine(computedChartObject,evenOdd,numOfChartRowWise);
	}
	else if(chartType==="column")
	{
		renderColumn(computedChartObject,evenOdd,numOfChartRowWise);
	}	
	}
function renderColumn(computedChartObject,evenOdd,numOfChartRowWise)
{
	//Calculating chart height.
	
	var chartheight=computedChartObject.chartobject.chartHeight;
	//Calculating chart width.
	var chartwidth=computedChartObject.chartobject.chartWidth;
	//Calculating number of charts to be rendered according to internal data structure.
	
	// Getting Plot data from internal data structure.
	var plot = computedChartObject.chartobject.plot;
	var numOfChart = computedChartObject.chartobject.plot.length;
	for(var i=0;i<numOfChart;i++)
		{
			//Local variable to hold X-Axis Tick values.
			var numOfXTick = computedChartObject.xaxistickvalues.numOfTickValues;
			//Local variable to hold Y-Axis details.
			var yTickDetails = computedChartObject.yaxistickvaluesdetails.yAxisTickValues[i];
			//Local variable to hold Y-Axis Title.
			var yTitle= computedChartObject.chartobject.plot[i].plotyAxisTitle;
			//Locl variable to hold X-Axis labels.
			var xLabels= computedChartObject.xaxistickvalues.xAxisLabels;
			//Local variable to hold X-Axis name.
			var xTitle = computedChartObject.chartobject.xaxisName;
			//Putting Plot information inside an array.
			var plotData= plot[i].data;
			//calling function for rendering all Data-Visualization items
			
				svgColumnCreate(chartheight,chartwidth,numOfXTick,xLabels,yTickDetails,yTitle,xTitle,plotData,i,numOfChart,evenOdd,numOfChartRowWise);
			
		}		
}
function renderLine(computedChartObject,evenOdd,numOfChartRowWise)
{
	//Calculating chart height.
	
	var chartheight=computedChartObject.chartobject.chartHeight;
	//Calculating chart width.
	var chartwidth=computedChartObject.chartobject.chartWidth;
	//Calculating number of charts to be rendered according to internal data structure.
	
	// Getting Plot data from internal data structure.
	var plot = computedChartObject.chartobject.plot;
	var numOfChart = computedChartObject.chartobject.plot.length;
	for(var i=0;i<numOfChart;i++)
		{
			//Local variable to hold X-Axis Tick values.
			var numOfXTick = computedChartObject.xaxistickvalues.numOfTickValues;
			//Local variable to hold Y-Axis details.
			var yTickDetails = computedChartObject.yaxistickvaluesdetails.yAxisTickValues[i];
			//Local variable to hold Y-Axis Title.
			var yTitle= computedChartObject.chartobject.plot[i].plotyAxisTitle;
			//Locl variable to hold X-Axis labels.
			var xLabels= computedChartObject.xaxistickvalues.xAxisLabels;
			//Local variable to hold X-Axis name.
			var xTitle = computedChartObject.chartobject.xaxisName;
			//Putting Plot information inside an array.
			var plotData= plot[i].data;
			//calling function for rendering all Data-Visualization items
			
				svgCreate(chartheight,chartwidth,numOfXTick,xLabels,yTickDetails,yTitle,xTitle,plotData,i,numOfChart,evenOdd,numOfChartRowWise);
			
		}		
}
/*
-----------------------------------------------------------------------------------------------
	@parseJson() resposible for parsing external JSON structure to an internal JSON structure.
	@json input after after asynchronously loading JSON data from external JSON file.
-----------------------------------------------------------------------------------------------
*/
function parseJsonData(json)
	{
	/*
	Creation of intermidiate object to hold converted multi-variate data set
	and this calculation will be done from this intermidiate object for rendering purpose.

	*/
	var chartObject = new Object();
	//attributes defined for intermidiate object.
	var dataValueProperties = Object.keys(json.dataValues);
	
	var numberOfCharts = dataValueProperties.length-1;
	chartObject.chartCaption=json.dataCosmetics.caption;
	chartObject.chartSubCption=json.dataCosmetics.subCaption;
	chartObject.xaxisName= dataValueProperties[0];
	chartObject.xAxisData= json.dataValues[chartObject.xaxisName].split(",");
	chartObject.plot = new Array();
    chartObject.chartHeight= json.dataCosmetics.height;
    chartObject.chartWidth= json.dataCosmetics.width;
    chartObject.chartType= json.dataCosmetics.chartType;
    chartObject.sortType= json.dataCosmetics.sortType;
    var yAxisDataValues= new Array();
    for(var index=1;index<=numberOfCharts;index++)
    {
    	var sum=0;
     	var yValues = new Object();
    	yValues.yTitle=dataValueProperties[index];
   		yValues.yData= json.dataValues[dataValueProperties[index]].split(",");
    	var ynumval = new Array();
   		for(var k of yValues.yData)
    	{
    		if(k===""||k===null||typeof k=== undefined||typeof k===NaN)
    		{
    				continue;
    		}
    		var val = parseFloat(k);
    		sum+=val;
    		ynumval.push(val);
   		}
   
  		yValues.maxVal =Math.max.apply(null,ynumval);
  	 	yValues.minVal= Math.min.apply(null,ynumval);
  	 	yValues.avgVal= sum/yValues.yData.length;
     	yAxisDataValues.push(yValues);
    }
    function compareMax(a,b)
    {
    	if(a.maxVal>=b.maxVal)
    		return -1;
    	if(a.maxVal<b.maxVal)
    		return 1;
    	return 0;
    }
    function compareMin(c,d)
    {
    	if(c.minVal>=d.minVal)
    		return 1;
    	if(c.minVal<d.minVal)
    		return -1;
    	return 0;
    }
    function compareAvg(e,f)
    {
    	if(e.avgVal>=f.avgVal)
    		return -1;
    	if(e.avgVal<f.avgVal)
    		return 1;
    	return 0;
    }
    if(chartObject.sortType!=="none"||chartObject.sortType!==null||typeof chartObject.sortType!==undefined)
    {
    	if(chartObject.sortType=="max")
    	{
    		yAxisDataValues.sort(compareMax);
    	}
    	else if(chartObject.sortType=="min")
    	{
    		yAxisDataValues.sort(compareMin);
    	}
    	else if(chartObject.sortType=="avg")
    	{
    		yAxisDataValues.sort(compareAvg);
    	}
	}

 
	for(var index=1;index<=numberOfCharts;index++)
	{
		console.log();
		var plotData = new Object();
		var xAxisData = json.dataValues[chartObject.xaxisName].split(",");
		var yAxisData = yAxisDataValues[index-1].yData;
		plotData.plotyAxisTitle= yAxisDataValues[index-1].yTitle;
		plotData.data = new Array();
		for(var interIndex=0; interIndex<xAxisData.length&&interIndex<yAxisData.length;interIndex++)
		{
			if((xAxisData[interIndex]===""||xAxisData[interIndex]===null|| typeof xAxisData[interIndex]===undefined)||(yAxisData[interIndex]===""||yAxisData[interIndex]===null|| typeof yAxisData[interIndex]===undefined)||typeof yAxisData[interIndex]===NaN)
			{
				continue;
			}
			else
			{
				var dataValue = new Object();
				dataValue.label=xAxisData[interIndex];
				dataValue.value=yAxisData[interIndex];
				plotData.data.push(dataValue);
			}
		}
		chartObject.plot.push(plotData);

	}
	// declaring variable to hold chart-caption , Sub-Caption, X-Axis label, time values.
  

	//holding the different charts value for the newly created object and storing it in plot attribute as an array.
	

	/*
	Declaration of object for holding  X-Axis tick values
	such as number of tick values and value of tick labels.
	*/
	var xAxisTick = new Object();
	// Defining attributes for holding number of tick values and label values for XAxis.
	xAxisTick.numOfTickValues=0;
	xAxisTick.xAxisLabels = new Array();
	//Fetching number of tick values and labels for all x axis values.
	getXAxisTicks(chartObject,xAxisTick);
	//Logging xAxisTick Value
	//console.log(xAxisTick);
	//Declaration of object to store Y-Axis Tick Details
	var yAxisTickDetails = new Object();
	//Declaration of Object to store individual chart Y-Axis Details
 	yAxisTickDetails.yAxisTickValues = new Array();
 	//Declaration of loop to iterate within different plot
 	for(var j =0; j<chartObject.plot.length;j++){
			var minYAxisValue,maxYAxisValue;
			var yAxisValues = new Array();
			for(var i=0;i<chartObject.plot[j].data.length;i++)
			{
				yAxisValues.push(chartObject.plot[j].data[i].value);
			}
			//Calculation of maximum and minimum of Y-Axis values
			minYAxisValue= Math.min.apply(this,yAxisValues);
			maxYAxisValue= Math.max.apply(this,yAxisValues);
			//Creation of Tick Object to store individual chart Y-Axis tick values
			var yAxisTick = new Object();
 			yAxisTick.numOfYTickValues;
 			//Declaration of Array to hold different divline(tick) values
			yAxisTick.DivLineValues= new Array();
 			//Defining an array to hold different divline(tick) values.
			yAxisTick.DivLineValues= new Array();
			yAxisTick.stepValue;
			yAxisTick.niceMaxExactDivValue;
 			yAxisTick.niceMinExactDivValue;
			getYAxisTicks(maxYAxisValue,minYAxisValue,yAxisTick);
			yAxisTickDetails.yAxisTickValues.push(yAxisTick);
	}

		//Creating another chart object to pass in render-engine
	    var entireChartObject = new Object();
		entireChartObject.chartobject = chartObject;
		entireChartObject.xaxistickvalues= xAxisTick;
		entireChartObject.yaxistickvaluesdetails= yAxisTickDetails;
		//calling render-engine
		renderEngine(entireChartObject);
	}
/*
	--------------------------------------------------------------------------------------------
	Function for getting number of tick values and labels for all x axis values.
	@chartObject-> Internal data structure parsed from external Json structure.
	--------------------------------------------------------------------------------------------
*/
function getXAxisTicks(chartObject,xAxisTick)
	{
	for(var i=0;i<chartObject.xAxisData.length;i++)
	{
  		 xAxisTick.xAxisLabels.push(chartObject.xAxisData[i]);
   		xAxisTick.numOfTickValues++;
	}
	}
/*
	@round() to calculate round up-to nth different decimal place
*/
function round(value, precision) 
	{
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
	}
/*---------------------------------------------------------------------------------------------
 	Fuction for calculating Y-Axis Tick Values it will take maximum and minimum yAxis value and defined tick object
 ----------------------------------------------------------------------------------------------
 */
function getYAxisTicks(maxYAxisValue,minYAxisValue,yAxisTick)
	{
	
	var maxValue = maxYAxisValue;
	var minValue = minYAxisValue;
	var rangeval = maxValue-minValue;
	var noOfStep = 6;
	//Calling function for calculating nice step values.
	var niceRange = calculateNiceStepSize(rangeval,noOfStep);
	exactNiceMaxValue= niceRange*Math.ceil(maxValue/niceRange);
	exactNiceMinValue=niceRange* Math.floor(minValue/niceRange);
	//Array defination to hold Y-Axis divline properties
	var divLineValues = new Array();
	var stepValue=(exactNiceMaxValue-exactNiceMinValue)/6;
	divLineValues.push(exactNiceMinValue);
	for(var k =1;k<6;k++)
	{
		//checking whether the value only has fractional part
		if(Math.floor(exactNiceMinValue)===0)
		{
			//inserting values in an array
			divLineValues.push(round((exactNiceMinValue+(k*stepValue)),3));
		}
		else
		{
			//inserting values inside an array
			divLineValues.push(round((exactNiceMinValue+(k*stepValue)),0));
		}
	}
	//inserting values inside an array.
	divLineValues.push(exactNiceMaxValue);
	//Assigning calculated Y-Axis div-line properties into yAxisTick object.
	yAxisTick.niceMaxExactDivValue=exactNiceMaxValue;
 	yAxisTick.niceMinExactDivValue= exactNiceMinValue;
	yAxisTick.stepValue=stepValue;
	//assigning different divline(tick) values.
	//Storing divline(tick) values in the yAxisTick object property.
 	yAxisTick.DivLineValues=divLineValues;
 	yAxisTick.numOfYTickValues=divLineValues.length;
	}
/*---------------------------------------------------------------------------------------------
	@calculateNiceStepSize -> calculating nice step values for Y-Axis values.
	-------------------------------------------------------------------------------------------
*/

var calculateNiceStepSize = function(range, noOfSteps)
	{
	var ln10 = Math.log(10);
  // calculate an initial guess at step size
  var tempStep = range / noOfSteps;

  // get the magnitude of the step size
  var magnitude = Math.floor(Math.log(tempStep) / ln10);
  var magPow = Math.pow(10, magnitude);

  // calculate most significant digit of the new step size
  var magMsd = Math.round(tempStep / magPow + 0.5);

  // promote the MSD to either 1, 2, or 5
  if (magMsd > 5.0)
    magMsd = 10.0;
  else if (magMsd > 2.0)
    magMsd = 5.0;
  else if (magMsd > 1.0)
    magMsd = 2.0;

  return magMsd * magPow;
	};
/*---------------------------------------------------------------------------------------------
	@svgCreate() Function responsible for creating and rendering  all SVG objects.
	input parameters 
	@chartheight -> Indivudual SVG height.
	@chartwidth  -> Individual SVG width.
	@numOfXTick  -> Number of X-Axis Ticks.
	@xLabels     -> Array of X-Axis Labels.
	@yTickDetails-> Array of Y-Axis Ticks.
	@yTitle      -> Title of Y-Axis.
	@xTitle 	 -> Title of X-Axis.
-----------------------------------------------------------------------------------------------
*/
function svgCreate(chartheight,chartwidth,numOfXTick,xLabels,yTickDetails,yTitle,xTitle,plotData,i,numOfChart,evenOdd,numOfChartRowWise)
			{
				var lastRowFirstChartIndex=0;
				if(evenOdd)
				{
					lastRowFirstChartIndex= (numOfChart- numOfChartRowWise)+1;
				}
				else
				{
					lastRowFirstChartIndex= (numOfChartRowWise*Math.floor(numOfChart/numOfChartRowWise))+1;
				}
				//variable declarations for X-Axis and Y-Axis.
				var height =chartheight;
				var width = chartwidth;
				var l1x1val = width/8;
 			 	var l1x2val = width/8;
 			 	var l1y1val = width/8;
 			 	var l1y2val = (height*3)/4;
 				var l2x1val= width/8;
 			 	var l2x2val= width-10;
 			 	var l2y1val= (height*3)/4;
 				var l2y2val = (height*3)/4;
 				if(height<width)
 				{
 			 		hfontsize = height/32;
 			 	}
 			 	else if(height==width)
 			 	{
 			 		hfontsize = height/32;
 			 	}
 			 	else
 			 	{
 			 		hfontsize=width/32;
 			 	}
 			 	
				//var div = document.createElement("div");
				//div.classList.add("chartContainer");
				var xCordArr = new Array();
				var yCordarr = new Array();
				//Defining array to hold all plot-slice attribute values.
				var plotSliceCollection = new Array();
				//Declaring SVG namespace.
				var NS="http://www.w3.org/2000/svg";
				var parentSvg = document.createElementNS(NS,"svg");
				parentSvg.setAttributeNS(null,"height",height);
				parentSvg.setAttributeNS(null,"width",width);
				var childSvg = document.createElementNS(NS,"svg");
				childSvg.setAttributeNS(null,"height",height/8);
				childSvg.setAttributeNS(null,"width",width-10);
				//Creation of SVG object
				//Creation of SVG object
				var svg=document.createElementNS(NS,"svg");
 				 svg.setAttributeNS(null,"height",(height*3)/4);
 				 svg.setAttributeNS(null,"width",width);
 				 svg.setAttributeNS(null,"class","chart");
 				 //creating Y-Axis
				var line = document.createElementNS(NS,"line");
				line.setAttributeNS(null,"x1",l1x1val);
				line.setAttributeNS(null,"x2",l1x2val);
				line.setAttributeNS(null,"y1",l1y1val);
				line.setAttributeNS(null,"y2",l1y2val);
				line.setAttributeNS(null,"stroke","#202020");
				line.setAttributeNS(null,"stroke-width",5);
				line.setAttributeNS(null,"class","xAxis");
				svg.appendChild(line);
				//Creating X-Axis
				var line1 = document.createElementNS(NS,"line");
				line1.setAttributeNS(null,"x1",l2x1val);
				line1.setAttributeNS(null,"x2",l2x2val);
				line1.setAttributeNS(null,"y1",l2y1val);
				line1.setAttributeNS(null,"y2",l2y2val);
				line1.setAttributeNS(null,"stroke","#202020");
				line1.setAttributeNS(null,"stroke-width",5);
				line1.setAttributeNS(null,"class","yAxis");
				svg.appendChild(line1);
				//Rendering X-Axis and Y-Axis titles
			/*	if(i==numOfChart-1)
					{
				
						var text = document.createElementNS(NS,"text");
						text.setAttributeNS(null,"x",(width*5)/8);
						text.setAttributeNS(null,"y",(19*height)/20);
						text.setAttributeNS(null,"fill", "#000000");
						text.style.fontSize=hfontsize;
						text.textContent = xTitle;
						text.setAttributeNS(null,"class","xAxisTitle");
						svg.appendChild(text);
					}*/
				var seriesRect = document.createElementNS(NS,"rect");
				seriesRect.setAttributeNS(null,"x",l1x1val);
				seriesRect.setAttributeNS(null,"y",0);
				seriesRect.setAttributeNS(null,"width",width);
				seriesRect.setAttributeNS(null,"height",height/6);
				seriesRect.setAttributeNS(null,"fill","#CEECF5");
				childSvg.appendChild(seriesRect);
				var text1 = document.createElementNS(NS,"text");
				var w =width/3;
				var h = 25;
				text1.setAttributeNS(null,"x",w);
				text1.setAttributeNS(null,"y",h);
				text1.setAttributeNS(null,"fill", "#000000");
				//text1.setAttributeNS(null,"transform","rotate(270 270,100)");
				text1.style.fontSize=hfontsize;
				text1.textContent = "Series-Name :"+yTitle;
				childSvg.appendChild(text1);
				text1.classList.add("yAxisTitle");
				var divLineValues= yTickDetails.DivLineValues;
				var niceMaxDivLineValues = yTickDetails.niceMaxExactDivValue;
				var niceMinDivLineValue = yTickDetails.niceMinExactDivValue;
				var numTickValue= yTickDetails.numOfYTickValues;
				var stepValue = yTickDetails.stepValue;
				//Rendering Tick values
				for(var k =0;k<=divLineValues.length;k++)
				{
					var divLineValue= divLineValues[k];
					var step =(l1y2val-l1y1val)/numTickValue;
					var divln = document.createElementNS(NS,"line");
					divln.setAttributeNS(null,"x1",l2x1val-5);
					divln.setAttributeNS(null,"x2",l2x2val);
					divln.setAttributeNS(null,"y1",l2y1val-(k*step));
					divln.setAttributeNS(null,"y2",l2y1val-(k*step));
					divln.setAttributeNS(null,"stroke","#202020");
					divln.setAttributeNS(null,"stroke-width",1);
					svg.appendChild(divln);
					var divrect = document.createElementNS(NS,"rect");
					divrect.setAttributeNS(null,"x",l2x1val);
					divrect.setAttributeNS(null,"y",l2y1val-(k*step));
					divrect.setAttributeNS(null,"width",l2x2val-l2x1val);
					divrect.setAttributeNS(null,"height",(l1y2val-l1y1val)/numTickValue);
					divrect.setAttributeNS(null,"stroke","#ffffff");
					if(k%2==0)
					divrect.setAttributeNS(null,"fill","#ffffff");
					else
					divrect.setAttributeNS(null,"fill","#f5f5ef");
					divrect.setAttributeNS(null,"stroke-width",0);
					svg.appendChild(divrect);
					divln.classList.add("yAxisDivLine");
					var yLabel = document.createElementNS(NS,"text");
					yLabel.setAttributeNS(null,"x",(width-(width*7)/8)/2.6);
					yLabel.setAttributeNS(null,"y",l2y1val-(k*step));
					//yLabel.setAttributeNS(null,"fill", "#000000");
					yLabel.style.fontSize=hfontsize;
					yLabel.textContent = valueNormalizer(divLineValue);
					yLabel.classList.add("yAxisLabels");
					svg.appendChild(yLabel);
					var yMapping = new Object();
					yMapping.yCordinate= l2y1val-(k*step);
					yMapping.value= divLineValues[k];
					yCordarr.push(yMapping);	

				}
				var chartRectangle = document.createElementNS(NS,"rect");
				chartRectangle.setAttributeNS(null,"x",l1x1val);
				chartRectangle.setAttributeNS(null,"y",l1y1val);
				chartRectangle.setAttributeNS(null,"width",(l2x2val-l1x1val)+10);
				chartRectangle.setAttributeNS(null,"height",(l1y2val-l1y1val));
				//chartRectangle.setAttributeNS(null,"fill","#202020");
				chartRectangle.setAttributeNS(null,"class","rect");
				svg.appendChild(chartRectangle);
				for(var j=0;j<(numOfXTick);j++)
				{
					var step = (l2x2val - l2x1val)/(numOfXTick-1);
					var xTick =document.createElementNS(NS,"line");
					xTick.setAttributeNS(null,"x1",l2x1val+(j*step));
					xTick.setAttributeNS(null,"x2",l2x1val+(j*step));
					xTick.setAttributeNS(null,"y1",(height*3)/4);
					xTick.setAttributeNS(null,"y2",(height*307)/400);
					xTick.setAttributeNS(null,"stroke","#202020");
					xTick.setAttributeNS(null,"stroke-width",1);
					xTick.classList.add("xAxisDivLine");
					var tickCordinate = new Object();
					tickCordinate.X= l2x1val+(j*step);
					tickCordinate.Y= (height*3)/4;
					var xMapping = new Object();
					xMapping.xCordinate;
					xMapping.Value;
					var xLabel = createXLabel(j,tickCordinate,xLabels,xMapping,hfontsize,width);
					xCordArr.push(xMapping);
					parentSvg.appendChild(xTick);
					if(i>=lastRowFirstChartIndex-1)
					{
						parentSvg.appendChild(xLabel);
					}
				}
				for(var t =0,u=1;t<yCordarr.length-1;t++,u++)
				{
					var plotSlice = new Object();
					plotSlice.minValue= yCordarr[t].value;
					plotSlice.maxValue= yCordarr[u].value;
					plotSlice.minCordinate= yCordarr[t].yCordinate;
					plotSlice.maxCordinate= yCordarr[u].yCordinate;
					plotSliceCollection.push(plotSlice);

				}
				//Drawing Data-plot anchors
				var plotCircles =drawPlot(xCordArr,yCordarr,plotSliceCollection,plotData);
				//console.log(plotCircles.length);
				var prevX=0;
				var prevY=0;
				for(var c =0;c<plotCircles.length;c++)
				{ 
					
					if((prevX!=0)&&(prevY!=0))
					{
						var linkLine = document.createElementNS(NS,"line");
						linkLine.setAttributeNS(null,"x1",prevX);
					 	linkLine.setAttributeNS(null,"x2",plotCircles[c].x);
						linkLine.setAttributeNS(null,"y1",prevY);
						linkLine.setAttributeNS(null,"y2",plotCircles[c].y);
						//linkLine.setAttributeNS(null,"stroke","green");
						linkLine.setAttributeNS(null,"id","linkline");
						linkLine.classList.add("plotLines");
						svg.appendChild(linkLine);
					}
					
					prevX=plotCircles[c].x;
					prevY= plotCircles[c].y;
					
				}
				for(var c =0;c<plotCircles.length;c++)
				{ 
					var plotCircle = document.createElementNS(NS,"circle");
					plotCircle.setAttributeNS(null, "cx", plotCircles[c].x);
					plotCircle.setAttributeNS(null, "cy", plotCircles[c].y);
					plotCircle.setAttributeNS(null, "r",  width/100);
					//plotCircle.setAttributeNS(null, "fill", "green");
					var toolTip = document.createElementNS(NS, "title"); 
                    toolTip.setAttributeNS(null, "class", "plotToolTip"); 
                    toolTip.innerHTML =plotCircles[c].yValue; 
                    plotCircle.setAttributeNS(null,"class","plotDots");
                    plotCircle.appendChild(toolTip);
                    svg.appendChild(plotCircle);
				}
				//div.appendChild(svg);
				//document.getElementById("entireChart").appendChild(svg);
				
				parentSvg.appendChild(childSvg);
				parentSvg.appendChild(svg);
				document.body.appendChild(parentSvg);

				//@crossLineCustomEventHandler -> function for propagating custom events and other events on chart.
				crossLineCustomEventHandler(document.getElementsByClassName("rect"));
				
			}

//Function for rendering coulmn chart
function svgColumnCreate(chartheight,chartwidth,numOfXTick,xLabels,yTickDetails,yTitle,xTitle,plotData,i,numOfChart,evenOdd,numOfChartRowWise)
			{
				var lastRowFirstChartIndex=0;
				if(evenOdd)
				{
					lastRowFirstChartIndex= (numOfChart- numOfChartRowWise)+1;
				}
				else
				{
					lastRowFirstChartIndex= (numOfChartRowWise*Math.floor(numOfChart/numOfChartRowWise))+1;
				}
				//console.log(screen.height);
				//console.log(screen.width);
				//variable declarations for X-Axis and Y-Axis.
				var height =chartheight;
				var width = chartwidth;
				var l1x1val = width/8;
 			 	var l1x2val = width/8;
 			 	var l1y1val = height/8;
 			 	var l1y2val = (height*3)/4;
 				var l2x1val= width/8;
 			 	var l2x2val= width-10;
 			 	var l2y1val= (height*3)/4;
 				var l2y2val = (height*3)/4;
 				if(height<width)
 				{
 			 		hfontsize = height/32;
 			 	}
 			 	else if(height==width)
 			 	{
 			 		hfontsize = height/32;
 			 	}
 			 	else
 			 	{
 			 		hfontsize=width/32;
 			 	}
 			 	
				//var div = document.createElement("div");
				//div.classList.add("chartContainer");
				var xCordArr = new Array();
				var yCordarr = new Array();
				//Defining array to hold all plot-slice attribute values.
				var plotSliceCollection = new Array();
				//Declaring SVG namespace.
				var NS="http://www.w3.org/2000/svg";
				var parentSvg = document.createElementNS(NS,"svg");
				parentSvg.setAttributeNS(null,"height",height);
				parentSvg.setAttributeNS(null,"width",width);
				var childSvg = document.createElementNS(NS,"svg");
				childSvg.setAttributeNS(null,"height",height/8);
				childSvg.setAttributeNS(null,"width",width-10);
				//Creation of SVG object
				var svg=document.createElementNS(NS,"svg");
 				 svg.setAttributeNS(null,"height",(height*3)/4);
 				 svg.setAttributeNS(null,"width",width);
 				 svg.setAttributeNS(null,"class","chart");
 				 //creating Y-Axis
				var line = document.createElementNS(NS,"line");
				line.setAttributeNS(null,"x1",l1x1val);
				line.setAttributeNS(null,"x2",l1x2val);
				line.setAttributeNS(null,"y1",l1y1val);
				line.setAttributeNS(null,"y2",l1y2val);
				line.setAttributeNS(null,"stroke","#202020");
				line.setAttributeNS(null,"stroke-width",5);
				line.setAttributeNS(null,"class","xAxis");
				svg.appendChild(line);
				//Creating X-Axis
				var line1 = document.createElementNS(NS,"line");
				line1.setAttributeNS(null,"x1",l2x1val);
				line1.setAttributeNS(null,"x2",l2x2val);
				line1.setAttributeNS(null,"y1",l2y1val);
				line1.setAttributeNS(null,"y2",l2y2val);
				line1.setAttributeNS(null,"stroke","#202020");
				line1.setAttributeNS(null,"stroke-width",5);
				line1.setAttributeNS(null,"class","yAxis");
				svg.appendChild(line1);
				//Rendering X-Axis and Y-Axis titles
			/*	if(i==numOfChart-1)
					{
				
						var text = document.createElementNS(NS,"text");
						text.setAttributeNS(null,"x",(width*5)/8);
						text.setAttributeNS(null,"y",(19*height)/20);
						text.setAttributeNS(null,"fill", "#000000");
						text.style.fontSize=hfontsize;
						text.textContent = xTitle;
						text.setAttributeNS(null,"class","xAxisTitle");
						svg.appendChild(text);
					}*/
				var seriesRect = document.createElementNS(NS,"rect");
				seriesRect.setAttributeNS(null,"x",l1x1val);
				seriesRect.setAttributeNS(null,"y",0);
				seriesRect.setAttributeNS(null,"width",width);
				seriesRect.setAttributeNS(null,"height",height/6);
				seriesRect.setAttributeNS(null,"fill","#CEECF5");
				childSvg.appendChild(seriesRect);
				var text1 = document.createElementNS(NS,"text");
				var w =width/3;
				var h = 25;
				text1.setAttributeNS(null,"x",w);
				text1.setAttributeNS(null,"y",h);
				text1.setAttributeNS(null,"fill", "#000000");
				//text1.setAttributeNS(null,"transform","rotate(270 270,100)");
				text1.style.fontSize=hfontsize;
				text1.textContent = "Series-Name :"+yTitle;
				childSvg.appendChild(text1);
				text1.classList.add("yAxisTitle");
				var divLineValues= yTickDetails.DivLineValues;
				var niceMaxDivLineValues = yTickDetails.niceMaxExactDivValue;
				var niceMinDivLineValue = yTickDetails.niceMinExactDivValue;
				var numTickValue= yTickDetails.numOfYTickValues;
				var stepValue = yTickDetails.stepValue;
				//Rendering Tick values
				for(var k =0;k<=divLineValues.length;k++)
				{
					var divLineValue= divLineValues[k];
					var step =(l1y2val-l1y1val)/numTickValue;
					var divln = document.createElementNS(NS,"line");
					divln.setAttributeNS(null,"x1",l2x1val-5);
					divln.setAttributeNS(null,"x2",l2x2val);
					divln.setAttributeNS(null,"y1",l2y1val-(k*step));
					divln.setAttributeNS(null,"y2",l2y1val-(k*step));
					divln.setAttributeNS(null,"stroke","#202020");
					divln.setAttributeNS(null,"stroke-width",1);
					svg.appendChild(divln);
					var divrect = document.createElementNS(NS,"rect");
					divrect.setAttributeNS(null,"x",l2x1val);
					divrect.setAttributeNS(null,"y",l2y1val-(k*step));
					divrect.setAttributeNS(null,"width",l2x2val-l2x1val);
					divrect.setAttributeNS(null,"height",(l1y2val-l1y1val)/numTickValue);
					divrect.setAttributeNS(null,"stroke","#ffffff");
					if(k%2==0)
					divrect.setAttributeNS(null,"fill","#ffffff");
					else
					divrect.setAttributeNS(null,"fill","#f5f5ef");
					divrect.setAttributeNS(null,"stroke-width",0);
					svg.appendChild(divrect);
					divln.classList.add("yAxisDivLine");
					var yLabel = document.createElementNS(NS,"text");
					yLabel.setAttributeNS(null,"x",(width-(width*7)/8)/2.6);
					yLabel.setAttributeNS(null,"y",l2y1val-(k*step));
					//yLabel.setAttributeNS(null,"fill", "#000000");
					yLabel.style.fontSize=hfontsize;
					yLabel.textContent = valueNormalizer(divLineValue);
					yLabel.classList.add("yAxisLabels");
					svg.appendChild(yLabel);
					var yMapping = new Object();
					yMapping.yCordinate= l2y1val-(k*step);
					yMapping.value= divLineValues[k];
					yCordarr.push(yMapping);	

				}
				var chartRectangle = document.createElementNS(NS,"rect");
				chartRectangle.setAttributeNS(null,"x",l1x1val);
				chartRectangle.setAttributeNS(null,"y",l1y1val);
				chartRectangle.setAttributeNS(null,"width",(l2x2val-l1x1val)+10);
				chartRectangle.setAttributeNS(null,"height",(l1y2val-l1y1val));
				//chartRectangle.setAttributeNS(null,"fill","#202020");
				chartRectangle.setAttributeNS(null,"class","rect");
				svg.appendChild(chartRectangle);
				for(var j=0;j<(numOfXTick+1);j++)
				{
					var step = (l2x2val - l2x1val)/(numOfXTick+1);
					var xTick =document.createElementNS(NS,"line");
					xTick.setAttributeNS(null,"x1",l2x1val+(j*step));
					xTick.setAttributeNS(null,"x2",l2x1val+(j*step));
					xTick.setAttributeNS(null,"y1",(height*3)/4);
					xTick.setAttributeNS(null,"y2",(height*307)/400);
					xTick.setAttributeNS(null,"stroke","#202020");
					xTick.setAttributeNS(null,"stroke-width",1);
					xTick.classList.add("xAxisDivLine");

					if(j==0)
					{
						continue;
					}
					var tickCordinate = new Object();
					tickCordinate.X= l2x1val+(j*step);
					tickCordinate.Y= (height*3)/4;
					var xMapping = new Object();
					xMapping.xCordinate;
					xMapping.Value;
					var xLabel = createColumnXLabel(j,tickCordinate,xLabels,xMapping,hfontsize,width);
					xCordArr.push(xMapping);
					//svg.appendChild(xTick);
					if(i>=lastRowFirstChartIndex-1)
					{

						parentSvg.appendChild(xLabel);
					}
				}
				for(var t =0,u=1;t<yCordarr.length-1;t++,u++)
				{
					var plotSlice = new Object();
					plotSlice.minValue= yCordarr[t].value;
					plotSlice.maxValue= yCordarr[u].value;
					plotSlice.minCordinate= yCordarr[t].yCordinate;
					plotSlice.maxCordinate= yCordarr[u].yCordinate;
					plotSliceCollection.push(plotSlice);

				}
				//Drawing Data-plot anchors
				var plotCircles =drawPlot(xCordArr,yCordarr,plotSliceCollection,plotData);
				//console.log(plotCircles.length);
				var prevX=0;
				var prevY=0;
				for(var c =0;c<plotCircles.length;c++)
				{ 
					
					
					
					prevX=plotCircles[c].x;
					prevY= plotCircles[c].y;
					
				}
				for(var c =0;c<plotCircles.length;c++)
				{ 
					var height =l1y2val-plotCircles[c].y;
					var plotCircle = document.createElementNS(NS,"rect");
					plotCircle.setAttributeNS(null, "x", plotCircles[c].x-width/40);
					plotCircle.setAttributeNS(null, "y", plotCircles[c].y);
					//plotCircle.setAttributeNS(null, "r",  width/100);
					//plotCircle.setAttributeNS(null, "fill", "green");
					plotCircle.setAttributeNS(null,"width",width/20);
					plotCircle.setAttributeNS(null,"height",height);
					var toolTip = document.createElementNS(NS, "title"); 
                    toolTip.setAttributeNS(null, "class", "plotToolTip"); 
                    toolTip.innerHTML =plotCircles[c].yValue; 
                    plotCircle.setAttributeNS(null,"class","rectToolTip");
                    plotCircle.appendChild(toolTip);
                    svg.appendChild(plotCircle);
				}
				//div.appendChild(svg);
				
				
				parentSvg.appendChild(childSvg);
				parentSvg.appendChild(svg);
				
				document.body.appendChild(parentSvg);

				//@crossLineCustomEventHandler -> function for propagating custom events and other events on chart.
				//crossLineCustomEventHandler(document.getElementsByClassName("rect"));
				columnHover(document.getElementsByClassName("rectToolTip"));
			}
function columnHover(listOfColumns)
	{

		for(var column of listOfColumns )
		{
			column.addEventListener("mouseover",function(event){
			var columnHoverlistener = new CustomEvent("initializeColumn",{detail:event.clientX});
			var currentColumnx = event.currentTarget.getAttributeNS(null,"x");
			var columnList = new Array();
			for(var cc of listOfColumns)
			{
				if(cc.getAttributeNS(null,"x")===currentColumnx)
				{

					columnList.push(cc);
				
				}
			}
			for(var columnn of columnList)
			{
				columnn.dispatchEvent(columnHoverlistener);
			}
		
			event.currentTarget.style.fill="#8A0808";
			var text = event.currentTarget.getElementsByClassName("plotToolTip");
			//console.log(text[0].innerHTML);
			var content=text[0].innerHTML;
			coly =  event.currentTarget.getAttributeNS(null,"y")-10;
			var rectWidth = event.currentTarget.getAttributeNS(null,"width");
			var rectTool = document.createElementNS("http://www.w3.org/2000/svg","rect");
			rectTool.setAttributeNS(null,"x",currentColumnx-5);
			rectTool.setAttributeNS(null,"y",coly-15);
			rectTool.setAttributeNS(null,"width",(content.length*10)+10);
			rectTool.setAttributeNS(null,"height",22);
			rectTool.setAttributeNS(null,"id","rectTool");
			rectTool.setAttributeNS(null,"fill","#ffb3b3");
			event.currentTarget.parentNode.appendChild(rectTool);
			var coltext = document.createElementNS("http://www.w3.org/2000/svg","text");
			coltext.setAttributeNS(null,"x",currentColumnx);
			coltext.setAttributeNS(null,"y",coly);
			coltext.textContent= text[0].innerHTML;
			coltext.style.fontSize="12";
			coltext.setAttributeNS(null,"id","ctext");
			event.currentTarget.parentNode.appendChild(coltext);

		});
	column.addEventListener("initializeColumn",function(event){
		
		this.style.fill="#8A0808";
		var text = event.currentTarget.getElementsByClassName("plotToolTip");
		var content=text[0].innerHTML;
		var currentColumnx = event.currentTarget.getAttributeNS(null,"x");
		coly =  event.currentTarget.getAttributeNS(null,"y")-10;
		var rectWidth = event.currentTarget.getAttributeNS(null,"width");
		var rectTool = document.createElementNS("http://www.w3.org/2000/svg","rect");
		rectTool.setAttributeNS(null,"x",currentColumnx-5);
		rectTool.setAttributeNS(null,"y",coly-15);
		rectTool.setAttributeNS(null,"width",(content.length*10)+10);
		rectTool.setAttributeNS(null,"height",22);
		rectTool.setAttributeNS(null,"class","rectTool");
		rectTool.setAttributeNS(null,"fill","#ffb3b3");
		event.currentTarget.parentNode.appendChild(rectTool);
		var coltext = document.createElementNS("http://www.w3.org/2000/svg","text");
		coltext.setAttributeNS(null,"x",currentColumnx);
		coltext.setAttributeNS(null,"y",coly);
		coltext.style.fontSize="12";
		coltext.textContent= text[0].innerHTML;
		coltext.setAttributeNS(null,"class","colToolText");
		event.currentTarget.parentNode.appendChild(coltext);

		});
	column.addEventListener("mouseleave",function(event){
		var columnleavelistener = new CustomEvent("leaveColumn",{detail:event.clientX});
		for(var col of listOfColumns)
		{
			if(col!==event.target)
			{
				col.dispatchEvent(columnleavelistener);
				
			}
		}
		event.currentTarget.style.fill="#0040FF";
		var tt=document.getElementById("ctext");

				event.target.parentNode.removeChild(tt);
			var rt = document.getElementById("rectTool");
			event.target.parentNode.removeChild(rt);
	});
	column.addEventListener("leaveColumn",function(event){
		
		this.style.fill="#0040FF";
		colt = document.getElementsByClassName("colToolText");
		for(var v of colt)
		{
		if(event.target.parentNode===v.parentNode)
		{
				event.target.parentNode.removeChild(v);
		}
		}
		rectt = document.getElementsByClassName("rectTool");
		for(var r of rectt)
		{
			if(event.target.parentNode===r.parentNode)
		{
				event.target.parentNode.removeChild(r);
		}
		}

	});
	}
}
/*
	@crossLineCustomEventHandler() -> propagating and handling all events intiated within the chart.
	@listOfCharts -> colection of SVG rectangle created.
*/
function crossLineCustomEventHandler(listOfCharts)
	{
		for(var charts of listOfCharts)
			{
				//event handler for mousemove event.
				charts.addEventListener("mouseenter",function(event)
					{
						//@intializeCrossHeir -> custom event for creating crossheir in all other charts.
						var initializeCrossHeir = new CustomEvent("InitializeCrossHeir",{detail:event.clientX});
							for(var chart of listOfCharts)
								{
									if(chart!==event.target)
									{
										chart.dispatchEvent(initializeCrossHeir);
									}
								}
								if(charts===event.target)
								{
									var svgheight =charts.getAttributeNS(null,"height");
									var svgwidth = charts.getAttributeNS(null,"width");
						var NS="http://www.w3.org/2000/svg";
						var cross = document.createElementNS(NS,"line");
						cross.setAttributeNS(null,"x1",svgwidth);
						cross.setAttributeNS(null,"x2",svgwidth);
						cross.setAttributeNS(null,"y1",svgwidth/8);
						cross.setAttributeNS(null,"y2",svgheight);
						cross.setAttributeNS(null,"stroke","red");
						cross.setAttributeNS(null,"class","crossHide");
						cross.setAttributeNS(null,"id","ii");
						event.target.parentNode.appendChild(cross);
						var toolTipRectangle = document.createElementNS(NS,"rect");
						toolTipRectangle.setAttributeNS(null,"x",svgwidth/3);
						toolTipRectangle.setAttributeNS(null,"y",svgheight);
						toolTipRectangle.setAttributeNS(null,"width",95);
						toolTipRectangle.setAttributeNS(null,"height",35);
						toolTipRectangle.setAttributeNS(null,"fill","#ffb3b3");
						toolTipRectangle.setAttributeNS(null,"id","rec");
						toolTipRectangle.setAttributeNS(null,"class","rectHide");
						var toolTipText = document.createElementNS(NS,"text");
						toolTipText.setAttributeNS(null,"x",svgwidth/3);
						toolTipText.setAttributeNS(null,"y",svgheight);
						toolTipText.setAttributeNS(null,"id","text");
						//toolTipText.textContent="helo";
						toolTipText.setAttributeNS(null,"class","tooTipHide");
						event.target.parentNode.appendChild(toolTipRectangle);
						event.target.parentNode.appendChild(toolTipText);
					}
					
					},false);
				//custome event listner for mouseenter for different charts
					charts.addEventListener("InitializeCrossHeir",function(event)
					{
						var svgheight = parseInt(event.target.getAttributeNS(null,"height"));
						var svgwidth = parseInt(event.target.getAttributeNS(null,"y"));
						var NS="http://www.w3.org/2000/svg";
						var cross = document.createElementNS(NS,"line");
						cross.setAttributeNS(null,"x1",svgwidth/9.5);
						cross.setAttributeNS(null,"x2",svgwidth/9.5);
						cross.setAttributeNS(null,"y1",svgwidth/8);
						cross.setAttributeNS(null,"y2",svgheight);
						cross.setAttributeNS(null,"stroke","red");
						cross.setAttributeNS(null,"class","cross");
						//cross.setAttributeNS(null,"id","ii");
						event.target.parentNode.appendChild(cross);
						var toolTipRectangle = document.createElementNS(NS,"rect");
						toolTipRectangle.setAttributeNS(null,"x",svgwidth);
						toolTipRectangle.setAttributeNS(null,"y",svgheight);
						toolTipRectangle.setAttributeNS(null,"width",95);
						toolTipRectangle.setAttributeNS(null,"height",35);
						toolTipRectangle.setAttributeNS(null,"fill","#ffb3b3");
						toolTipRectangle.setAttributeNS(null,"id","rec");
						toolTipRectangle.setAttributeNS(null,"class","rectHide");
						var toolTipText = document.createElementNS(NS,"text");
						toolTipText.setAttributeNS(null,"x",svgwidth/3);
						toolTipText.setAttributeNS(null,"y",svgheight);
						toolTipText.setAttributeNS(null,"id","text");
						toolTipText.setAttributeNS(null,"class","toolTipHide");
						event.target.parentNode.appendChild(toolTipRectangle);
						event.target.parentNode.appendChild(toolTipText);
					});
					//Mousemove event handler
				charts.addEventListener("mousemove",function(event)
					{
						var crossHeirMove = new CustomEvent("CrossHeirMove",{detail:{mousex:event.clientX,mousey:event.clientY}});
						for(var chart of listOfCharts)
							{
								if(chart!==event.target)
									{
										chart.dispatchEvent(crossHeirMove);
									}
							}

						var svgheight = parseInt(event.target.getAttributeNS(null,"x"));
						var svgwidth = parseInt(event.target.getAttributeNS(null,"y"));
						var ee = event.clientX;
						var rec = event.currentTarget.parentNode.getElementById("rec");
						var ttext = event.currentTarget.parentNode.getElementById("text");
						var tool = event.currentTarget.parentNode.getElementsByClassName("plotToolTip");
						for(var t of tool)
							{

								if(event.currentTarget.parentNode === t.parentNode.parentNode)
									{
										
										if(ee-9=== Math.round(t.parentNode.getAttributeNS(null,"cx")))
										{
											
											rec.setAttributeNS(null,"x",t.parentNode.getAttributeNS(null,"cx")-40);
											rec.setAttributeNS(null,"y",t.parentNode.getAttributeNS(null,"cy")-20);
											rec.setAttributeNS(null,"width",((t.innerHTML.length)*10)+10);
											rec.setAttributeNS(null,"fill","#ffb3b3");
											rec.setAttributeNS(null,"class","rectShow");
											ttext.setAttributeNS(null,"x",t.parentNode.getAttributeNS(null,"cx")-40);
											ttext.setAttributeNS(null,"y",t.parentNode.getAttributeNS(null,"cy"));
											ttext.setAttributeNS(null,"class","toolTipShow");
											ttext.textContent= t.innerHTML;
											console.log(ee+"   "+t.innerHTML);
											
										}
									

										
									}
							}
							var cross = document.getElementById("ii");
					

								cross.setAttributeNS(null,"x1",ee-10);
								cross.setAttributeNS(null,"x2",ee-10);
								cross.setAttributeNS(null,"class","crossdiff");
								
						
					
				},false);
				//custom event listner for mousemove for different charts
					charts.addEventListener("CrossHeirMove",function(event){
					var svgheight = parseInt(event.target.getAttributeNS(null,"x"));
					var svgwidth = parseInt(event.target.getAttributeNS(null,"y"));
					
					var ee = event.detail.mousex;
					var yy = event.detail.mousey;
					
					if(charts!=event.source)
						{
							var rec = event.currentTarget.parentNode.getElementById("rec");
							var ttext = event.currentTarget.parentNode.getElementById("text");
							
								var tool = event.currentTarget.parentNode.getElementsByClassName("plotToolTip");
						for(var t of tool)
							{

								if(event.currentTarget.parentNode === t.parentNode.parentNode)
									{
										if(ee-9=== Math.round(t.parentNode.getAttributeNS(null,"cx")))
										{
											rec.setAttributeNS(null,"x",t.parentNode.getAttributeNS(null,"cx")-40);
											rec.setAttributeNS(null,"y",t.parentNode.getAttributeNS(null,"cy")-20);
											rec.setAttributeNS(null,"width",((t.innerHTML.length)*10)+10);
											rec.setAttributeNS(null,"fill","#ffb3b3");
											rec.setAttributeNS(null,"class","rectShowDiff");
											ttext.setAttributeNS(null,"x",t.parentNode.getAttributeNS(null,"cx")-40);
											ttext.setAttributeNS(null,"y",t.parentNode.getAttributeNS(null,"cy"));
											//ttext.setAttributeNS(null,"fill","#ffb3b3");
											ttext.setAttributeNS(null,"class","toolTipShowDiff");
											ttext.textContent= t.innerHTML;
											//console.log(ee+"   "+t.innerHTML);
										}
										
										
									}

							}
							var cross = document.getElementsByClassName("cross");
							for(var c of cross)
								{

									c.setAttributeNS(null,"x1",ee-4);
									c.setAttributeNS(null,"x2",ee-4);
									
								}
					}});
					charts.addEventListener("mouseleave",function(event)
				{




					var cross = document.getElementById("ii");
					var rec = event.currentTarget.parentNode.getElementById("rec");
					var ttext = event.currentTarget.parentNode.getElementById("text");
						
							if(cross)
								event.target.parentNode.removeChild(cross);
							if(rec)
							event.currentTarget.parentNode.removeChild(rec);
							if(ttext)
								event.currentTarget.parentNode.removeChild(ttext);
							
					var crossHeirDisappear = new CustomEvent("DisapearCrossHeir",{detail:event.clientX});
					for(var chart of listOfCharts)
					{
						if(chart!==event.target)
						{
							event.target.dispatchEvent(crossHeirDisappear);
						}
					}
					
				});
					charts.addEventListener("DisapearCrossHeir", function(event){
						
						var cross = document.getElementsByClassName("cross");
						var rec = document.getElementsByClassName("rectShowDiff");
						var ttext = document.getElementsByClassName("toolTipShowDiff");
						for(var c of cross)
					{
						if(c.parentNode===event.target.parentNode)
						{
							//if(cross)
								event.target.parentNode.removeChild(c);
							}
						}
						for(var r of rec)
						{
							if(r.parentNode===event.target.parentNode)
							{
								//rec.style.visibility="hidden";
							
							event.currentTarget.parentNode.removeChild(r);
						}
						}
						for(var t of ttext)
						{
							if(t.parentNode===event.target.parentNode)
							{
								//ttext.style.visibility="hidden";
								event.currentTarget.parentNode.removeChild(ttext);
							}
						}
					});

				}
			}
/*----------------------------------------------------------------------------------------------------------
	Function which will rendering  X-Axis labels
	@index--> parameter for denoting a particular Tick.
	@tickCordinate for holdig cordinate value of a particular tick.
	@xLabel Returing a SVG object.
	--------------------------------------------------------------------------------------------------------
*/

function createXLabel(index,tickCordinate,xLabels,xMapping,hfontsize,width)
	{		
		var NS="http://www.w3.org/2000/svg";	
		var xLabel = document.createElementNS(NS,"text");
		xLabel.setAttributeNS(null,"x",(tickCordinate.X)-width/40);
		xLabel.setAttributeNS(null,"y",tickCordinate.Y+20);
		//xLabel.setAttributeNS(null,"fill", "#000000");
		xLabel.style.fontSize=hfontsize;
		xLabel.textContent = xLabels[index].substring(0,3)+"...";
		//xLabel.setAttribute("transform","rotate(2 "+tickCordinate.X+" "+tickCordinate.Y+10+")");
		xLabel.classList.add("xAxisLabels");
		xMapping.Value=xLabels[index];
		xMapping.xCordinate=tickCordinate.X;
		return xLabel;
	}
		function createColumnXLabel(index,tickCordinate,xLabels,xMapping,hfontsize,width)
	{		
		var NS="http://www.w3.org/2000/svg";	
		var xLabel = document.createElementNS(NS,"text");
		xLabel.setAttributeNS(null,"x",tickCordinate.X-width/40);
		xLabel.setAttributeNS(null,"y",tickCordinate.Y+10);
		//xLabel.setAttributeNS(null,"fill", "#000000");
		xLabel.style.fontSize=hfontsize;
		xLabel.textContent = xLabels[index-1].substring(0,3)+"...";
		//xLabel.setAttribute("transform","rotate(2 "+tickCordinate.X+" "+tickCordinate.Y+10+")");
		xLabel.classList.add("xAxisLabels");
		xMapping.Value=xLabels[index-1];
		xMapping.xCordinate=tickCordinate.X;
		return xLabel;
	}
/*----------------------------------------------------------------------------------------------------------
	Function for calculating  Data-Plot Cordinates and producing internal data-structure
	with data plot coordinates and values.
------------------------------------------------------------------------------------------------------------
*/ 
function drawPlot(xCordArr,yCordarr,plotSliceCollection,plotData)
	{
		var dataPlotCollection = new Array();
		for(var d=0;d<plotData.length;d++)
			{
				var plotXValue = plotData[d].label;
				var plotYValue = plotData[d].value;
				var plotXCordinate=0;
				var plotYCordinate=0;
				for(var t=0;t<xCordArr.length;t++)
					{
						if(xCordArr[t].Value==plotXValue)
						{
							plotXCordinate= xCordArr[t].xCordinate;	
							break;
						}		
					}
					for(var p=0;p<plotSliceCollection.length;p++)
					{
						
						if(plotYValue>plotSliceCollection[p].minValue || plotYValue<plotSliceCollection[p].maxValue)
						{
							var valueRange = plotSliceCollection[p].maxValue- plotSliceCollection[p].minValue;
							var cordinateRange = plotSliceCollection[p].minCordinate-plotSliceCollection[p].maxCordinate;
							var pixcelValue = valueRange/cordinateRange;
							var valueValue = 1/pixcelValue;
							plotYCordinate= plotSliceCollection[p].minCordinate-(valueValue*(plotYValue-plotSliceCollection[p].minValue));
							break;

						}
					}

					var plotcord = new Object();
					plotcord.xValue=plotXValue;
					plotcord.yValue=plotYValue;
					plotcord.x = plotXCordinate;
					plotcord.y = plotYCordinate;
					dataPlotCollection.push(plotcord);
				}
				
			return dataPlotCollection;
	}

/*-----------------------------------------------------------------------------------------------------------
	@valuNormalizer function is responsible for showing Y-Axis values with a particular unit accorrding to the defined range.
	 @divLineValue local variable acts as parameter for possible number system
--------------------------------------------------------------------------------------------------------------
*/
function valueNormalizer(divLineValue)
	{	
		//console.log(divLineValue);
		var resValue;
		if((Math.floor(divLineValue)===0))
			{
				resValue= divLineValue;

			}
			else
			{
				var valueLength = parseInt(String(Math.abs(Math.floor(divLineValue))).length);
				if(valueLength>=1 && valueLength<4)
				{
					resValue= divLineValue;
				}
				else if(valueLength>=4&&valueLength<6)
				{
					resValue= round((divLineValue/1000),1)+"k";
				}
				else if(valueLength>=6 && valueLength<8)
				{
					resValue= round((divLineValue/100000),1)+"Lkh";
				}
				else
				{
					resValue= round((divLineValue/10000000),1)+"Cr";
				}
			}
				return resValue;
	}
/*
	JSON file is hosted in a server that's why to access JSON file need to call it asynchronously.
	---------------------------------------------------------------------------------------------
	loadJsonFile function is declared to access JSON file asynchronously.

	---------------------------------------------------------------------------------------------
	parseJsonData function is declared to read the multi-variate data set in the given JSON file
	and convert it in internal data structure.

*/
//@url parameter for passing JSON File address
function loadJsonFile(url) 
	{
	
		//declaration of variable to hold XMLHttpRequest object.
		//declaration of variable to hold parsed json file.
		var xmlhttp = new XMLHttpRequest(),
            json;
            
		//Anonymous function declared to parse every time the readState changes.           
		xmlhttp.onreadystatechange = function () 
		{
			//Checking whether status is OK or not and request finished and response is ready.
    		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) 
    			{
					//Parsing the JSON file and holding it in a variable.     
       				 json = JSON.parse(xmlhttp.responseText);
					//calling parseJsonData function to convert multi-variate data set into customized intermidiate data structure.     
       				parseJsonData(json);
				}

		}
		//Specifies the type of request
		xmlhttp.open('GET', url, true);
		//Sends the request to the server
		xmlhttp.send();
	}
//Calling function for loading JSON file asynchronously.
//Everytime page loads loadJsonFile function wil be called.
loadJsonFile("DataResource/DataSource.json");

