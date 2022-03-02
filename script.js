// --------------Circle packing--------------


const circlepackingdata = [
  { name: 'origin', parent: '', country: 'Contact Tracing Method' },
  
  // { name: 'news', parent: 'origin' },
  
  { name: 'decentralised', parent: 'origin', country:'Decentralised' },
  { name: 'cen', parent: 'origin', country:'Centralised' },
  { name: '?', parent: 'origin', country:'Unknown' },
  
  { name: 'apple/google', parent: 'decentralised', amount: 30, country: 'Austria, Canada, Czech Republic, Denmark, Ecuador, Estonia, Finland, Germany, Gibraltar, Iceland, Italy, Japan, Kazakhstan, Latvia, The Netherlands, New Zealand, North Macedonia, Northern Ireland, Norway, Poland, Portugal, Russia, Saudi Arabia, Scotland, Slovenia, South Africa, Spain, Switzerland, United Kingdom'},
  { name: 'GPS,Bluetooth', parent: 'decentralised', amount: 1 , country: 'Israel'},
  
  { name: 'ROBERT', parent: 'cen', amount: 1, country: 'France' },
  { name: 'Bluetooth', parent: 'cen', amount: 3, country: 'Australia, Bangladesh, Ethiopia' },
  { name: 'GPS,Bluetooth', parent: 'cen', amount: 3, country: 'India, Malaysia, Qatar' },
  { name: 'BlueTrace', parent: 'cen', amount: 2, country: 'Singapore, Fiji' },
  { name: 'Data mining', parent: 'cen', amount: 2, country: 'China, Ghana' },
  { name: 'GPS', parent: 'cen', amount: 1, country: 'Israel' },
  
  { name: 'unknown', parent: '?', amount: 2, country: 'Israel' },
  { name: 'GPS', parent: '?', amount: 1, country: 'Bahrain' },
];

const circlepackingsvg = d3.select('.circlepackingcanvas')
              .append('svg')
              .attr("class","circlepackingsvg")
              .attr('width', 860)
              .attr('height', 800);

const graph = circlepackingsvg.append('g')
                 .attr('transform', 'translate(50, 50)'); // to give a 50px margin

const stratify = d3.stratify()
                   .id(d => d.name)
                   .parentId(d => d.parent);

const rootNode = stratify(circlepackingdata)
  .sum(d => d.amount);

const pack = d3.pack()
               .size([860, 600])
               .padding(10);

const bubbleData = pack(rootNode).descendants();

// create an ordinal color scale
const colorscale = d3.scaleOrdinal(['#75DCCD', '#4DC1CA', 'white']);

// join data and add group for each node
const circlepackingnodes = graph.selectAll('g')
                   .data(bubbleData)
                   .enter()
                   .append('g')
                   .attr('transform', d => `translate(${d.x}, ${d.y})`)
;

// add circle to each group
circlepackingnodes.append('circle')
     .attr('r', d => d.r)
     .attr('fill', d => colorscale(d.depth))
     .attr('opacity', 1)
    ;

// add text to each group
circlepackingnodes
     .append('text')
     .attr('text-anchor', 'middle')
     .attr('dy','0.1em')
     .attr('fill', 'black')
     .style('font-size', '14')
     .text(d => d.data.name);
     




  // create a tooltip
  var circlepackingtooltip = d3.select('.circlepackingcanvas')
                  .append("div")
                  .style("opacity", 0)
                  .attr("class", "circlepackingtooltip")
                  .style("background-color", "white")
                  .style("border", "solid")
                  .style("border-width", "2px")
                  .style("border-radius", "5px")
                  .style("padding", "5px")
                  .style("z-index", "10")
                  .style("position", "absolute")
  
// hover
circlepackingnodes.on('mouseover', mouseoveri)
                  .on('mouseleave', mouseleavei)



function mouseoveri(event, d){
    console.log(d)
    d3.select(this)
      .attr('opacity', 1)
      .style('stroke', 'black')
      .attr('stroke-width', '1')
      .style('cursor', 'pointer')
    
    let pt = d3.pointer(event, this)
    circlepackingtooltip.style('opacity', 1)
            // .style('left', pt[0]+10+'px')
            // .style('top', pt[1]+'px')
            .style("left",(event.pageX+10)+"px")
            .style("top",(event.pageY-10)+"px")
            .html(`<div style="font-size:14px; max-width:200px">${d.data.country}</div>`)
            
}

function mouseleavei(event, d){
    d3.select(this)
      .attr('stroke-width', '0')
      .attr('opacity', 1)
    circlepackingtooltip.style('opacity', 0)
}



// title

d3.select('.circlepackingsvg')
  .append("g")
  .attr("class", "circletitle")
  .append("text")
  .attr("x",490)
  .attr("y",600)
  .text("UNKNOWN")
  .style("opacity",1)
;

d3.select('.circlepackingsvg')
  .append("g")
  .attr("class", "circletitle")
  .append("text")
  .attr("x",590)
  .attr("y",220)
  .text("CENTRALISED")
  .style("opacity",1);

d3.select('.circlepackingsvg')
  .append("g")
  .attr("class", "circletitle")
  .append("text")
  .attr("x",288)
  .attr("y",180)
  .text("DECENTRALISED")
  .style("opacity",1);


// Legend

d3.select('.circlepackingsvg')
  .append("g")
  .attr("class", "circlelegend")
  .append('circle')
  .attr('cx', 710)
  .attr('cy', 98)
  .attr('r',18)
  .attr("stroke", "black")
  .attr("stroke-width", "2")
  .attr("stroke-dasharray", "5,8")
  .attr("fill","white");
;

d3.select('.circlepackingsvg')
  .append("g")
  .attr("class", "circlelegendtitle")
  .append('text')
  .text('No. of apps')
  .attr('x', 738)
  .attr('y', 104)
;






// --------------Privacy Score--------------

var scoredata = d3.csvParse(`Region,Country,App,Img,Score
Oceania,Australia,COVIDSafe,https://play-lh.googleusercontent.com/XVzoq3SW1hHpc-IJmqm-hayFKFrJlL-4uqNduzFg7QOYWW-B3cLf38ocxrGPx3Q3XmY,7
Europe,Austria,Stopp Corona,https://play-lh.googleusercontent.com/2NERfqltW9rIkNkgCY96ZHjxWRRAm_5UXVWI3KcZJ3c1b9TKJZbD95N_7vGv1gUIbBA,5
Asia,Azerbaijan,e-Tabib,https://play-lh.googleusercontent.com/d5pg46bNbEcwBHTgwEqeCOH212Dw2q0WTcLED1HwGo7Dpya8QP02M1TtG8WGTWY53hM,0.5
Middle East,Bahrain,BeAware Bahrain,https://play-lh.googleusercontent.com/8TMJmaOvTfeuiP18b4KWIvOE4nykZpMT5DCHj_tgPagGwz1mAEYNtPj2TdUiUMizC1Wu,0
Asia,Bangladesh,Corona Tracer BD,https://play-lh.googleusercontent.com/c3GC-pLkTDqxWLDvzydG1eMwGoQ8j1rPhf5BoGeCR1bivGlBl93RdMCNZxQEt-UiVWVk,3
America,Canada,Covid Alert,https://play-lh.googleusercontent.com/F4A_XuDdWN_zq4oUVyk9H2aUc12yI7K0ojFN2NkXTSp0MmM4vQePeRZ9BjUBxUdaSqg,8.5
Asia,China,Health Code,/,2
America,Colombia,MinSalud Digital,https://play-lh.googleusercontent.com/FHMR1_v-wm_1mEc-LMCFa86kUfFAIDBnA3TnrV2iQDziLD5lt7TyUHYh76hqLrjnqDQ,2.5
Europe,Czech Republic,eRouška (eFacemask),https://play-lh.googleusercontent.com/lSPzHqiQyG1oV7C-fz9Gv6O5g1YhfEGi6x2lhuKJPdqlRvL0M74-TaJP2kWEW8_EqQ,6
Europe,Denmark,Smittestop,https://play-lh.googleusercontent.com/ucXPOwW7AhYdQhzMFN_xm7Ha12Ga9D9QEBxztSA0ZP3BlI9z3rFrLf72FDrtiRxigA,5.5
America,Ecuador,ASI (SO),https://play-lh.googleusercontent.com/yVmhVhI1rRyuTp8ohYg99hTs0ybG0whv9U_kjZTU6NCrpO6fICl6NT3hhvzyeuBB3dY,3.5
Europe,Estonia,Hoia,https://play-lh.googleusercontent.com/l3dMzjhiPen78XS5bYhyNz_WAtpQA4-iyjEF3QdV2oEQRWhpvDOk_KgZ3mvCgEp6wus,6.5
Africa,Ethiopia,Debo,https://play-lh.googleusercontent.com/FfevbpkTP9e5_W05xqb1gh9HF1eG3-IUir5UZBuNkz1iIsOEaqC4fkzZfTSEZk39ZuqU,0.5
Europe,France,TousAntiCovid,https://play-lh.googleusercontent.com/HjlF5_gYtZmJVc2jbVBksjUHy-Q4-0UiO8InPswlsncZhBZmnfQVsmv7jUvv8Nw5WA,5.5
Oceania,Fiji,careFIJI,https://play-lh.googleusercontent.com/CvEpgtY0r6Ii3XS4nWKILEQFOQz4j4i4m0JjGJsuJc5UI0QW5Q17Vj3sh4mHy8SvLA,5
Europe,Finland,Koronavilkku,https://play-lh.googleusercontent.com/bL8luN5-7ewDJ7PiAJAZeWsGYIUQ1GgV8bpfA-3TB7aECKHJiWn_6aadGVmcgCJCgA,5
Europe,Germany,Corona-Warn-App,https://play-lh.googleusercontent.com/iESHh8CY2DB9Epwjxu4hBq08sLriQvwyHCK_f4wtdXk_vPGpwYvtQXC7r2l-r3cSaSY3,8
Africa,Ghana,GH Covid-19 Tracker App,https://play-lh.googleusercontent.com/zSljQl5NONvfmNhJ0ckzImJmonvkJZV2hCFWpT-oFyJ95rYSUuL3OkAe9QfgiPBmu-w,0.5
Europe,Gibraltar,Beat Covid Gibraltar,https://play-lh.googleusercontent.com/HRy_hVA1PHNBwk4S_R12rIZbNQI94pTdPlFWhY5JO4TrN1UUF0V3bFAeOj51ELY_MwY,2
Europe,Iceland,Rakning C-19,https://play-lh.googleusercontent.com/sOUUvLX0EQllNQDk2f85p8AJ2J2MtG2a6EQuX9msAZ9TuDwAs1mfNYVdSeZbOt2AsQ,6.5
Asia,India,Aarogya Setu,https://play-lh.googleusercontent.com/2FV06dPOPcV-vupN9_9zqPn-pUUio-OzbnqktzIVCdkPcBRRtqo-k63G1DLgIeuJD1np,4
Europe,Ireland,COVID Tracker,https://play-lh.googleusercontent.com/plQnUf0aq-vGnkr0Geh_QA6Wi_QIh9p14bne6SBK27D314E82NvZQfuAXvEZ_GbiaQ,7
Middle East,Israel,HaMagen,https://play-lh.googleusercontent.com/AVJm7zIOg7V35X9VUEKjYtEBQgcUWguVwQ_N-qTXlh2LOLphljpYmPOsLgTUvDhqyQ=w480-h960-rw,4.5
Europe,Italy,Immuni,https://play-lh.googleusercontent.com/QSb7_bHeT5dQZReUWLirWVSQygmr4CzBioyfxutL84IB-CFY6BuKPdDyKVSWuvIVbtk,6.5
Asia,Japan,COVID-19 Contact Conﬁrming Application,https://play-lh.googleusercontent.com/te1Ju0ipndVYxatCebbML63uxbZWzj0jJxUBTXFdDsZ8VbXhNgBbRbCsDISpALKkWC8,7
Middle East,Jordan,AMAN APP—Jordan,https://play-lh.googleusercontent.com/7TfZvJeRmhhk_YAG5CO6W6tM7D83dcanR06Ja6ternRovnF2K9xSCU3ZqFt7vdI8eQ,4
Asia,Kazakhstan,Saqbol,https://play-lh.googleusercontent.com/OiaRVZ_oCtDOgavtUu3QFx8EIQrCqzT6WpZS9PGEsYWOAlwn--9L-FEhfiNTKb7g1pk,5
Europe,Latvia,Apturi Covid,https://play-lh.googleusercontent.com/Ujk59m6SFhlsReiGlGGpsACrmY8pR858wlZuM0j84gPnAWFSK4E_bOf_ldfNKmojy7NR,5
Asia,Malaysia,MySejahtera,https://play-lh.googleusercontent.com/Owl00JWsYGY-mLZ7O53GSeIFse4j_KEXa53Q8qNAaQNFb2YVYimLoe6j4gczuVYaaQ,3.5
Europe,Netherlands,CoronaMelder,https://play-lh.googleusercontent.com/YEOKI5qswMdGi3oQEIEv1sAtfrvzdazbS65ZSW_KzO-IGDMKsJzWq8nIJUWIVeH8fQ,6.5
Oceania,New Zealand,NZ COVID Tracer,https://play-lh.googleusercontent.com/ZMA1dWRZWVPtipUtSx37rzC7jwY3AFwQwGhg5QiofY5CHDId19OZeYxAcVwj6odi1Q,4.5
Europe,North Macedonia,Stop Korona!,https://play-lh.googleusercontent.com/y3BZTRyHigR9zNgO2iIR9onZbK0Rr5r8D9GiVZ3D9MlySa6FvrcksokIgOLX13WMt5A=s360-rw,3.5
Europe,Northern Ireland,StopCOVID NI,https://play-lh.googleusercontent.com/u7Gu7Kl8W3lnEHGM_GlALPc6VnKPyFsukcTag6O3E2V8S3jdTylbghCFKVO7ivBdbw,7
Europe,Norway,Smittestopp,https://play-lh.googleusercontent.com/peGKk0T2DyYlpjzIv5Q3YchOrdc-R4l7vzhz1CiPaXencX-yv8hx7m9VROqj-OVMwQ,2
Europe,Poland,ProteGO Safe,https://play-lh.googleusercontent.com/hP4Sapo5uUnevomjxjRc7pHSVDw_336S90Uo50XEBzDyxLDsBHO3CvhhZSTHFvV9LMAo2uHRqE5_x63DQ84D,5
Europe,Portugal,STAYAWAY COVID,https://play-lh.googleusercontent.com/Q9o2K8noKKnFwsXn-JJRxmXpoGWzRrw4PaDDwNgbwctJc3AgldzZYOERu7e2xJorZ7c,6
Middle East,Qatar,Ehteraz,https://play-lh.googleusercontent.com/gZCsV0SrmqM-gl0dVIABAdxB6BsgwXqgBMRMFedLrFCwk90gS0XG_KiJfcVNWVqZvQ,0
Europe,Russia,Contact Tracer,https://play-lh.googleusercontent.com/-VG6zQu14sMNBlGus_rc6vmYBFD9e2A4H24Zk2OnxSYtzIUrq2fWR4zBbD5QbIwej4Q,1
Middle East,Saudi Arabia,Tabaud,https://play-lh.googleusercontent.com/woCQKXmq8-3us_tBqV8edoJs0s0KVAbOw9d6NVDgQ8-DqmV7diBR61r_z9EqjnBgcA,4.5
Europe,Scotland,Protect Scotland,https://play-lh.googleusercontent.com/l61Y45bG4-IVkBdFMJJnr9_buLB0pMMzKt-t3VbDrnSSzNLgiu9mpfKUEZTiXzfmG5w,6.5
Asia,Singapore,TraceTogether,https://play-lh.googleusercontent.com/KKFBXprCdip2XYNtKxB57hsBOezhvtRlxxZWOFKiatqU2IcI8LLsgcYGcHoFnxD3p1Lb,5.5
Europe,Slovenia,#OstaniZdrav,https://play-lh.googleusercontent.com/7Mi9M6hlpif91oqUKZ9QPtpZo_SmM26wExpuZPiwA1YjfvbfYUGR5_mH8-XjqnAxBVLm,6.5
Africa,South Africa,COVID Alert South Africa,https://play-lh.googleusercontent.com/lLbpBtXDCeiOkV0i4vCj68gzryl69MeSp-vu6xb_yx4ueDtChE4UMaWs7dkaLMHvmg,5
Europe,Spain,Radar COVID,https://play-lh.googleusercontent.com/CG1SrQhMAHr85BQWANnU-QhcSLMHcu8r5h9LnzHYqweIre7copRzMSPXa5MJP3G0PA,7
Europe,Switzerland,SwissCovid App,https://play-lh.googleusercontent.com/aqKA0KyE2W88K0GWkFJekgfG_vsGm35H0QdeCcSuo7TaZWQlUsZLnfd265ywVY69pf4,7
Europe,United Kingdom,NHS COVID-19,https://play-lh.googleusercontent.com/vwH4PnKo5zTCr7Cnw22rnd-7v_poiu3der-9CeJ5llv5u0dvTSbX8uYqtA_lUT2E3a0,4.5`,function(d,i){
  return d
})

    // 設定scale
    const colorScale = d3.scaleOrdinal()
	                        .domain(["Middle East", "Oceania", "America", "Europe", "Asia", "Africa"])
	                        .range(["green", "#4DC1CA", "blue", "orange", "purple", "red"])
    
   const xaxisScale = d3.scaleLinear()
                      .domain([0,9])
                      .range([0,800])
   
   
   const yaxisScale = d3.scaleOrdinal()
                      .domain(["Middle East", "Oceania", "America", "Europe", "Asia", "Africa"])
                      .range([50,100,150,200,250,300])

    // 建立圓點，全都位於正中央
    const node = d3.select('.forceGroup')
               .append('g')
               .selectAll("circle")
               .data(scoredata)
               .enter()
              
               .append('circle')
               .attr('r', 8)
               // .attr('cx', d=>xaxisScale(d.Score))
               // .attr('cy', d=>yaxisScale(d.Region))
               .style('fill', d=>colorScale(d.Region))
               .style('opacity', '0.5')
    
    
    // 設定力模擬器
const simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(0.5).x(d => xaxisScale(d.Score)))
    .force("y", d3.forceY().strength(0.1).y( d => yaxisScale(d.Region)))
    .force("center", d3.forceCenter().x(600).y(250)) 
    .force("charge", d3.forceManyBody().strength(1)) 
    .force("collide", d3.forceCollide().strength(0.1).radius(8).iterations(1))



// 將力模擬器的節點綁定資料
simulation.nodes(scoredata)
          .on("tick", function(d){
               node.attr("cx", d => d.x)
                   .attr("cy", d => d.y)
            // node.attr("cx", d=>xaxisScale(d.Score))
            //     .attr('cy', d=>yaxisScale(d.Region))
            });



// 建立tooltips
const tooltips = d3.select(".privacyscoretable")
                .append("div")
                .style("opacity", 0)
                .style('position', 'absolute')
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")
// hover
node.on('mouseover', mouseover)
    .on('mouseleave', mouseleave)



function mouseover(event, d){
    console.log(d)
    d3.select(this)
      .attr('stroke', 'black')
      .attr('stroke-width', '3px')
      .attr('opacity', 1)
      .style('cursor', 'pointer')
    
    let pt = d3.pointer(event, this)
    tooltips.style('opacity', 1)
            .style('left', pt[0]+ 10 +'px')
            .style('top', pt[1]+'px')
            .html("<img src='"+d.Img+"'width='50px'>"+`<div><b>${d.Country}</b></div>`+`<div> App: ${d.App}</div>`+`<div> Score: ${d.Score}</div>`)
}

function mouseleave(event, d){
    d3.select(this)
      .attr('stroke', 'none')
      .attr('stroke-width', '0')
      .attr('opacity', 1)
    
    tooltips.style('opacity', 0)
}

// -----------------------------------------------------



// 設定比例尺
const xScale = d3.scaleLinear()
                 .domain([0,9])
                 .range([191.3829946528069,800+191.3829946528069]);

// 建立X軸線
const xAxis = d3.axisBottom()
                .scale(xScale)
                // .tickSize(400);

const xAxisLine = d3.select('.forceGroup')
                  .append('g')
                  .attr('class', 'xAxis')
    .attr('transform', `translate(0,400)`)
                  .call(xAxis)
                  .style("font-family","TT Norms Pro")
                  .style("font-size","14")




// 建立y軸線
const yScale = d3.scaleOrdinal()
       .domain(["Middle East", "Oceania", "America", "Europe", "Asia", "Africa"])
                      .range([50,100,150,200,250,300])

const yAxis = d3.axisLeft()
                .scale(yScale)
                


const yAxisLine = d3.select('.forceGroup')
                  .append('g')
                  .attr('class', 'yAxis')
    .attr('transform', `translate(150,60)`)
                  .call(yAxis)
                  .style("font-family","TT Norms Pro")
                  .style("font-size","14")



d3.select('.forceGroup')
  .append("g")
  .attr("class", "xaxistitle")
 .append("text")
 .attr("x",546.8873852540141)
 .attr("y",450)
 .text("Privacy Score")
 .style("opacity",1);


// Legend

var colorset = [
  {
   "Color": "red",
   "Title": "Africa"
  },{
   "Color": "purple",
   "Title": "Asia"
  },{
   "Color": "orange",
   "Title": "Europe"
  },{
   "Color": "blue",
   "Title": "America"
  },{
   "Color": "#4DC1CA",
   "Title": "Oceania"
  },{
   "Color": "green",
   "Title": "Middle East"
  }        
]

		var legend = d3.select('.forceGroup')
                  .selectAll(".legend")
                    .data(colorset)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {return "translate(800,"+i*24+")";});


			legend.append("circle")
            .attr("cx", 240)
            .attr("cy", 150)
            .attr("r",8)
            .style("fill", d=>d.Color)
            .attr("opacity",0.5);

			legend.append("text")
            .attr("x", 18+240)
            .attr("y", 150)
            .attr("width", 40)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(d=>d.Title);

d3.select('.forceGroup')
  .append("g")
  .append('circle')
  .attr('cx', 1040)
  .attr('cy', 104)
  .attr('r',8)
  .attr("stroke", "black")
  .attr("stroke-width", "2")
  .attr("fill","white");
;

d3.select('.forceGroup')
  .append("g")
  .append('text')
  .text('One application')
  .attr('x', 1056)
  .attr('y', 110)
;





// Tracking VS Permission

var data = d3.csvParse(`Region,Country,AppName,Permission,DangerPermission,Tracking,Img
Oceania,Australia,COVIDSafe,11,2,1,https://play-lh.googleusercontent.com/XVzoq3SW1hHpc-IJmqm-hayFKFrJlL-4uqNduzFg7QOYWW-B3cLf38ocxrGPx3Q3XmY
Europe,Austria,Stopp Corona,7,0,0,https://play-lh.googleusercontent.com/2NERfqltW9rIkNkgCY96ZHjxWRRAm_5UXVWI3KcZJ3c1b9TKJZbD95N_7vGv1gUIbBA
Asia,Azerbaijan,e-Tabib,16,4,6,https://play-lh.googleusercontent.com/d5pg46bNbEcwBHTgwEqeCOH212Dw2q0WTcLED1HwGo7Dpya8QP02M1TtG8WGTWY53hM
Middle East,Bahrain,BeAware Bahrain,39,8,2,https://play-lh.googleusercontent.com/8TMJmaOvTfeuiP18b4KWIvOE4nykZpMT5DCHj_tgPagGwz1mAEYNtPj2TdUiUMizC1Wu
Asia,Bangladesh,Corona Tracer BD,10,2,0,https://play-lh.googleusercontent.com/c3GC-pLkTDqxWLDvzydG1eMwGoQ8j1rPhf5BoGeCR1bivGlBl93RdMCNZxQEt-UiVWVk
America,Canada,Covid Alert,9,1,0,https://play-lh.googleusercontent.com/F4A_XuDdWN_zq4oUVyk9H2aUc12yI7K0ojFN2NkXTSp0MmM4vQePeRZ9BjUBxUdaSqg
America,Colombia,MinSalud Digital,11,3,2,/
Europe,Czech Republic,eRouška (eFacemask),8,0,2,https://play-lh.googleusercontent.com/FHMR1_v-wm_1mEc-LMCFa86kUfFAIDBnA3TnrV2iQDziLD5lt7TyUHYh76hqLrjnqDQ
Europe,Denmark,Smittestop,22,2,0,https://play-lh.googleusercontent.com/lSPzHqiQyG1oV7C-fz9Gv6O5g1YhfEGi6x2lhuKJPdqlRvL0M74-TaJP2kWEW8_EqQ
America,Ecuador,ASI (SO),7,0,0,https://play-lh.googleusercontent.com/ucXPOwW7AhYdQhzMFN_xm7Ha12Ga9D9QEBxztSA0ZP3BlI9z3rFrLf72FDrtiRxigA
Europe,Estonia,Hoia,7,0,0,https://play-lh.googleusercontent.com/yVmhVhI1rRyuTp8ohYg99hTs0ybG0whv9U_kjZTU6NCrpO6fICl6NT3hhvzyeuBB3dY
Africa,Ethiopia,Debo,11,2,0,https://play-lh.googleusercontent.com/l3dMzjhiPen78XS5bYhyNz_WAtpQA4-iyjEF3QdV2oEQRWhpvDOk_KgZ3mvCgEp6wus
Europe,France,TousAntiCovid,15,3,0,https://play-lh.googleusercontent.com/FfevbpkTP9e5_W05xqb1gh9HF1eG3-IUir5UZBuNkz1iIsOEaqC4fkzZfTSEZk39ZuqU
Oceania,Fiji,careFIJI,30,4,4,https://play-lh.googleusercontent.com/HjlF5_gYtZmJVc2jbVBksjUHy-Q4-0UiO8InPswlsncZhBZmnfQVsmv7jUvv8Nw5WA
Europe,Finland,Koronavilkku,7,0,0,https://play-lh.googleusercontent.com/CvEpgtY0r6Ii3XS4nWKILEQFOQz4j4i4m0JjGJsuJc5UI0QW5Q17Vj3sh4mHy8SvLA
Europe,Germany,Corona-Warn-App,8,1,0,https://play-lh.googleusercontent.com/bL8luN5-7ewDJ7PiAJAZeWsGYIUQ1GgV8bpfA-3TB7aECKHJiWn_6aadGVmcgCJCgA
Africa,Ghana,GH Covid-19 Tracker App,40,7,0,https://play-lh.googleusercontent.com/iESHh8CY2DB9Epwjxu4hBq08sLriQvwyHCK_f4wtdXk_vPGpwYvtQXC7r2l-r3cSaSY3
Europe,Gibraltar,Beat Covid Gibraltar,4,0,0,https://play-lh.googleusercontent.com/zSljQl5NONvfmNhJ0ckzImJmonvkJZV2hCFWpT-oFyJ95rYSUuL3OkAe9QfgiPBmu-w
Europe,Iceland,Rakning C-19,19,4,4,https://play-lh.googleusercontent.com/HRy_hVA1PHNBwk4S_R12rIZbNQI94pTdPlFWhY5JO4TrN1UUF0V3bFAeOj51ELY_MwY
Asia,India,Aarogya Setu,13,3,2,https://play-lh.googleusercontent.com/sOUUvLX0EQllNQDk2f85p8AJ2J2MtG2a6EQuX9msAZ9TuDwAs1mfNYVdSeZbOt2AsQ
Europe,Ireland,COVID Tracker,7,0,0,https://play-lh.googleusercontent.com/2FV06dPOPcV-vupN9_9zqPn-pUUio-OzbnqktzIVCdkPcBRRtqo-k63G1DLgIeuJD1np
Middle East,Israel,HaMagen,23,3,2,https://play-lh.googleusercontent.com/plQnUf0aq-vGnkr0Geh_QA6Wi_QIh9p14bne6SBK27D314E82NvZQfuAXvEZ_GbiaQ
Europe,Italy,Immuni,6,0,0,https://play-lh.googleusercontent.com/AVJm7zIOg7V35X9VUEKjYtEBQgcUWguVwQ_N-qTXlh2LOLphljpYmPOsLgTUvDhqyQ=w480-h960-rw
Asia,Japan,COVID-19 Contact Conﬁrming Application,6,0,0,https://play-lh.googleusercontent.com/QSb7_bHeT5dQZReUWLirWVSQygmr4CzBioyfxutL84IB-CFY6BuKPdDyKVSWuvIVbtk
Middle East,Jordan,AMAN APP—Jordan,22,3,4,https://play-lh.googleusercontent.com/te1Ju0ipndVYxatCebbML63uxbZWzj0jJxUBTXFdDsZ8VbXhNgBbRbCsDISpALKkWC8
Asia,Kazakhstan,Saqbol,7,0,2,https://play-lh.googleusercontent.com/7TfZvJeRmhhk_YAG5CO6W6tM7D83dcanR06Ja6ternRovnF2K9xSCU3ZqFt7vdI8eQ
Europe,Latvia,Apturi Covid,8,0,2,https://play-lh.googleusercontent.com/OiaRVZ_oCtDOgavtUu3QFx8EIQrCqzT6WpZS9PGEsYWOAlwn--9L-FEhfiNTKb7g1pk
Asia,Malaysia,MySejahtera,19,6,1,https://play-lh.googleusercontent.com/Ujk59m6SFhlsReiGlGGpsACrmY8pR858wlZuM0j84gPnAWFSK4E_bOf_ldfNKmojy7NR
Europe,Netherlands,CoronaMelder,7,0,0,https://play-lh.googleusercontent.com/Owl00JWsYGY-mLZ7O53GSeIFse4j_KEXa53Q8qNAaQNFb2YVYimLoe6j4gczuVYaaQ
Oceania,New Zealand,NZ COVID Tracer,30,3,2,https://play-lh.googleusercontent.com/YEOKI5qswMdGi3oQEIEv1sAtfrvzdazbS65ZSW_KzO-IGDMKsJzWq8nIJUWIVeH8fQ
Europe,North Macedonia,Stop Korona!,7,0,0,https://play-lh.googleusercontent.com/ZMA1dWRZWVPtipUtSx37rzC7jwY3AFwQwGhg5QiofY5CHDId19OZeYxAcVwj6odi1Q
Europe,Northern Ireland,StopCOVID NI,7,0,0,https://play-lh.googleusercontent.com/y3BZTRyHigR9zNgO2iIR9onZbK0Rr5r8D9GiVZ3D9MlySa6FvrcksokIgOLX13WMt5A=s360-rw
Europe,Norway,Smittestopp,23,2,2,https://play-lh.googleusercontent.com/u7Gu7Kl8W3lnEHGM_GlALPc6VnKPyFsukcTag6O3E2V8S3jdTylbghCFKVO7ivBdbw
Europe,Poland,ProteGO Safe,7,0,2,https://play-lh.googleusercontent.com/peGKk0T2DyYlpjzIv5Q3YchOrdc-R4l7vzhz1CiPaXencX-yv8hx7m9VROqj-OVMwQ
Europe,Portugal,STAYAWAY COVID,7,0,0,https://play-lh.googleusercontent.com/hP4Sapo5uUnevomjxjRc7pHSVDw_336S90Uo50XEBzDyxLDsBHO3CvhhZSTHFvV9LMAo2uHRqE5_x63DQ84D
Middle East,Qatar,Ehteraz,21,6,7,https://play-lh.googleusercontent.com/Q9o2K8noKKnFwsXn-JJRxmXpoGWzRrw4PaDDwNgbwctJc3AgldzZYOERu7e2xJorZ7c
Europe,Russia,Contact Tracer,9,0,2,https://play-lh.googleusercontent.com/gZCsV0SrmqM-gl0dVIABAdxB6BsgwXqgBMRMFedLrFCwk90gS0XG_KiJfcVNWVqZvQ
Middle East,Saudi Arabia,Tabaud,8,0,2,https://play-lh.googleusercontent.com/-VG6zQu14sMNBlGus_rc6vmYBFD9e2A4H24Zk2OnxSYtzIUrq2fWR4zBbD5QbIwej4Q
Europe,Scotland,Protect Scotland,7,0,0,https://play-lh.googleusercontent.com/woCQKXmq8-3us_tBqV8edoJs0s0KVAbOw9d6NVDgQ8-DqmV7diBR61r_z9EqjnBgcA
Asia,Singapore,TraceTogether,15,3,2,https://play-lh.googleusercontent.com/l61Y45bG4-IVkBdFMJJnr9_buLB0pMMzKt-t3VbDrnSSzNLgiu9mpfKUEZTiXzfmG5w
Europe,Slovenia,#OstaniZdrav,7,0,0,https://play-lh.googleusercontent.com/KKFBXprCdip2XYNtKxB57hsBOezhvtRlxxZWOFKiatqU2IcI8LLsgcYGcHoFnxD3p1Lb
Africa,South Africa,COVID Alert South Africa,8,0,1,https://play-lh.googleusercontent.com/7Mi9M6hlpif91oqUKZ9QPtpZo_SmM26wExpuZPiwA1YjfvbfYUGR5_mH8-XjqnAxBVLm
Europe,Spain,Radar COVID,10,0,0,https://play-lh.googleusercontent.com/lLbpBtXDCeiOkV0i4vCj68gzryl69MeSp-vu6xb_yx4ueDtChE4UMaWs7dkaLMHvmg
Europe,Switzerland,SwissCovid App,11,1,0,https://play-lh.googleusercontent.com/CG1SrQhMAHr85BQWANnU-QhcSLMHcu8r5h9LnzHYqweIre7copRzMSPXa5MJP3G0PA
Europe,United Kingdom,NHS COVID-19,8,1,0,https://play-lh.googleusercontent.com/vwH4PnKo5zTCr7Cnw22rnd-7v_poiu3der-9CeJ5llv5u0dvTSbX8uYqtA_lUT2E3a0
`,function(d,i){
  return d
})


// --------Create SVG------------

d3.select("div.tackingvspremissiontable")

var svg = d3.select("div.tackingvspremissiontable")
            .append("svg")
            .style("width","1280px")
            .style("height","640px")
            // .attr("margin","0")
            

// ---------Define Scale------------

var scaleXaxis = d3.scaleLinear()
      .domain([0,40])
      .range([0,800])

var scaleYaxis = d3.scaleLinear()
      .domain([0,8])
      .range([0,400])

var scaleArea = d3.scaleLinear()
      .domain([0,100])
      .range([5,80])

var scaleColor = d3.scaleOrdinal()
      .domain([0,4000])
      .range(['blue','red','#4DC1CA','orange','purple','green'])


// ---------Connect Data, create group---------
var groups = svg.selectAll("g.AppName")
                .data(data)
                .enter()
                .append("g")
                .attr("class","App")
                
                
                
groups.append("circle")
      .attr("cx",(d)=>scaleXaxis(d.Permission)+40+10)
      .attr("cy",(d)=>-scaleYaxis(d.Tracking)+480)
      .attr("r",0)
      .attr("opacity",0.5)
      .attr("fill",(d)=>scaleColor(d.Region))
      .style('cursor', 'pointer')
      // .attr("position","relative")

      .transition()
      .duration(500)
      .delay((d)=>d.DangerPermission*100)
      .attr("r",(d)=>scaleArea(d.DangerPermission+1))


            
// -----------------Y-axis-------------------

let trackingvspermissionyScale = d3.scaleLinear()
               .domain([0,80])
               .range([0,400])

let axisGroup = svg
   .append("g")
   .attr("class","axis")
   .style("transform","translateY(480px)")   
   .selectAll("line.axis")
   .data( d3.range(8).map(d=>1*(d)) )
   .enter()

axisGroup.append("line")   
     .attr("class","axis")
     .attr("stroke","black")
     .attr("x1",40)
     .attr("x2",960)
     .attr("y1",(d,i)=>-trackingvspermissionyScale(d)*10)
     .attr("y2",(d,i)=>-trackingvspermissionyScale(d)*10)
     .attr("stroke-dasharray","5 5")
     .style("opacity",0.3)

axisGroup.append("text")
         .text(d=>d) 
         .attr("x",24)
         .attr("y",(d,i)=>-trackingvspermissionyScale(d)*10+6)  
         .attr("fill","black")
         .style("opacity",0.5)



// -----------------X-axis-------------------

let trackingvspermissionxScale = d3.scaleLinear()
            .domain([0,40])
            .range([0,800])

let axisGroupX = svg
   .append("g")
   .attr("class","axis")
   // .style("transform","translateY(480px)")   
   .selectAll("line.axis")
   .data( d3.range(9).map(d=>5*(d)) )
   .enter()

axisGroupX.append("text")
         .text(d=>d) 
         .attr("y",540)
         .attr("x",(d,i)=>trackingvspermissionxScale(d)+40)  
         .attr("fill","black")
         .style("opacity",0.5)

// -----------------X-axis title -------------------


svg.append("g")
   .attr("class", "xaxistitle")
   // .attr("transform", "translate(" +  padding + ", 0)")
  // .call(yAxis)
  /* Add some extra text for the unit alongside the axis */ 
   .append("text")
   // .attr("transform", "rotate(-90)") 
   // .attr("y", -padding +12) magic number just to stop the top of the T being cut off
   .attr("x",960/2-40)
   .attr("y",580)
   // .attr("x", -(h / 2))
   // .attr("dy", ".71em")
   // .style("text-anchor", "end")
   .text("Permission Number")
   // .attr("position","absolute")
   .style("opacity",0.5);

// -----------------Y-axis title -------------------

svg.append("g")
   .attr("class", "y axis")
   // .attr("transform", "translate(" +  padding + ", 0)")
  // .call(yAxis)
  /* Add some extra text for the unit alongside the axis */ 
   .append("text")
   .attr("transform", "rotate(-90)") 
   // .attr("y", -padding +12) magic number just to stop the top of the T being cut off
   .attr("x",-270)
   .attr("y",0)
   // .attr("x", -(h / 2))
   .attr("dy", ".71em")
   .style("text-anchor", "end")
   .text("Tracking Number")
   .attr("position","absolute")
   .style("opacity",0.5);

// --------Hover effect--------

// 建立tooltips
const trackingvspermissiontooltips = d3.select("div.tackingvspremissiontable")
                  .append("div")
                  .style("opacity", 0)
                  .style('position', 'absolute')
                  .attr("class", "tooltip")
                  .style("background-color", "white")
                  .style("border", "solid")
                  .style("border-width", "2px")
                  .style("border-radius", "5px")
                  .style("padding", "5px")


  groups.on('mouseover', function(){
         trackingvspermissiontooltips.style("opacity", 1) // 顯示tooltip
       })
       
      .on('mousemove', function(d){
        let pt = d3.pointer(event, svg.node()) // 抓圓點位置
        trackingvspermissiontooltips.style("opacity", 1)
                .style("padding", 10+'px')
                .style('left', pt[0]+10+'px')
                // .style('right',100+'px')
                // .style('top',+'px') 
                .style('top', pt[1]+'px')
                .html("<img src='"+d.target.__data__.Img+"'width='50px'>"+"<h2>"+d.target.__data__.Country+"</h2>"+
             "<p>App: "+d.target.__data__.AppName+"</p>"+
                "<p>Permission No.: "+d.target.__data__.Permission+"</p>"+
                "<p>Tracking No.: "+d.target.__data__.Tracking+"</p>")
  })
       //          .html('圓半徑：' + d.target.__data__.r) // 抓到綁定在DOM元素的資料
       // })

       .on('mouseleave', function(){ //設定滑鼠離開時tooltips隱藏
        trackingvspermissiontooltips.style("opacity", 0)
       });





// -------------Legend------------------

var colorset = [
  {
   "Color": "red",
   "Title": "Africa"
  },{
   "Color": "purple",
   "Title": "Asia"
  },{
   "Color": "orange",
   "Title": "Europe"
  },{
   "Color": "blue",
   "Title": "America"
  },{
   "Color": "#4DC1CA",
   "Title": "Oceania"
  },{
   "Color": "green",
   "Title": "Middle East"
  }        
]

		var legend = svg.selectAll(".legend")
                    .data(colorset)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {return "translate(900,"+i*24+")";});


			legend.append("circle")
            .attr("cx", 100)
            .attr("cy", 120)
            .attr("r", 8)
            // .attr("width", 10)
            // .attr("height", 10)
            .style("fill", d=>d.Color)
            .attr("opacity",0.5);

			legend.append("text")
            .attr("x", 118)
            .attr("y", 120)
            .attr("width", 40)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(d=>d.Title)




svg.append("g")
  .append('circle')
  .attr('cx', 930)
  .attr('cy', 65)
  .attr('r',15)
  .attr("stroke", "black")
  .attr("stroke-width", "2")
  .attr("stroke-dasharray", "5,5")
  .attr("fill","white");
;

svg.append("g")
  .append('text')
  .text('No. of dangerous premission')
  .attr('x', 954)
  .attr('y', 70)
;


// For individual app

  
  $(function() {
    
    var $filter = $('.filter');
    var $tab = $('.filter a');
    var $offers = $('.boxGroup .box')
    
    
// -------------ALL Filter---------------
    $filter.on('click touch', '.all',  function(e) {
      e.preventDefault();
      $tab.removeClass('current');
      $(this).addClass('current');
      
      $offers.hide();
      $offers.fadeIn( 100 );
      
    });
    
// -------------1. Africa Filter---------------
    
    $filter.on('click touch', '.africa',  function(e) {
      e.preventDefault();
      $tab.removeClass('current');
      $(this).addClass('current');
      
      $offers.show();
      $offers.fadeOut( 0 );
      $offers.filter('.africa').fadeIn( 100 );
    
    });
    
// -------------2. America Filter---------------
    
    $filter.on('click touch', '.america',  function(e) {
      e.preventDefault();
      $tab.removeClass('current');
      $(this).addClass('current');
      
      $offers.show();
      $offers.fadeOut( 0 );
      $offers.filter('.america').fadeIn( 100 );
     
    });
    
// -------------3. Asia Filter---------------
    
    $filter.on('click touch', '.asia',  function(e) {
      e.preventDefault();
      $tab.removeClass('current');
      $(this).addClass('current');
      
      $offers.show();
      $offers.fadeOut( 0 );
      $offers.filter('.asia').fadeIn( 100 );
     
    });

// -------------4. Europe Filter---------------
    
    $filter.on('click touch', '.europe',  function(e) {
      e.preventDefault();
      $tab.removeClass('current');
      $(this).addClass('current');
      
      $offers.show();
      $offers.fadeOut( 0 );
      $offers.filter('.europe').fadeIn( 100 );
     
    });

// -------------5. Middle East Filter---------------
    
    $filter.on('click touch', '.middleeast',  function(e) {
      e.preventDefault();
      $tab.removeClass('current');
      $(this).addClass('current');
      
      $offers.show();
      $offers.fadeOut( 0 );
      $offers.filter('.middleeast').fadeIn( 100 );
     
    });
    
// -------------6. Oceania Filter---------------
    
    $filter.on('click touch', '.oceania',  function(e) {
      e.preventDefault();
      $tab.removeClass('current');
      $(this).addClass('current');
      
      $offers.show();
      $offers.fadeOut( 0 );
      $offers.filter('.oceania').fadeIn( 100 );
     
    });
    

  });
  
// For individual app



// fade in Jquery

ScrollReveal({ reset: true });

ScrollReveal().reveal(".show-once", {
  reset: false
});

ScrollReveal().reveal(".fade-in", {
  duration: 5000,
  move: 0
});