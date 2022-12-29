(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.generator = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	var arrArticle = function() {
	    var $arr_articles = new Object();
	    
	    // $arr_articles['GO LIGHTBOX 085 200'] = 'GO-LB-085200-B';
	    // $arr_articles['GO LIGHTBOX 100 200'] = 'GO-LB-100200-B';
	    // $arr_articles['GO LIGHTBOX 185 200'] = 'GO-LB-185200-B';
	    // $arr_articles['GO LIGHTBOX 200 200'] = 'GO-LB-200200-B';

	    // $arr_articles['GO LIGHTBOX 085 225'] = 'GO-LB-085225-B';
	    // $arr_articles['GO LIGHTBOX 100 225'] = 'GO-LB-100225-B';
	    // $arr_articles['GO LIGHTBOX 185 225'] = 'GO-LB-185225-B';
	    // $arr_articles['GO LIGHTBOX 200 225'] = 'GO-LB-200225-B';

	    // $arr_articles['GO LIGHTBOX 085 250'] = 'GO-LB-085220-B';
	    // $arr_articles['GO LIGHTBOX 100 250'] = 'GO-LB-100250-B';
	    // $arr_articles['GO LIGHTBOX 185 250'] = 'GO-LB-185250-B';
	    // $arr_articles['GO LIGHTBOX 200 250'] = 'GO-LB-200250-B';

	    // $arr_articles['GO COUNTER L WHITE'] = 'GO-COUNTER-L';
	    // $arr_articles['FUSSPLATTEN EINSEITIG'] = 'GO-FEET-ES';
	    // $arr_articles['TÜR SET'] = 'GO-DOOR';
	    // $arr_articles['SYSTEMVERBINDER FLEX'] = 'GO-CONNECT-FLEX';
	    
	    $arr_articles['GO LIGHTBOX 085 200'] = '1560042';
	    $arr_articles['GO LIGHTBOX 100 200'] = '1560022';
	    $arr_articles['GO LIGHTBOX 185 200'] = '1560212';
	    $arr_articles['GO LIGHTBOX 200 200'] = '1560062';

	    $arr_articles['GO LIGHTBOX 085 225'] = '1560132';
	    $arr_articles['GO LIGHTBOX 100 225'] = '1560142';
	    $arr_articles['GO LIGHTBOX 185 225'] = '1560222';
	    $arr_articles['GO LIGHTBOX 200 225'] = '1560152';

	    $arr_articles['GO LIGHTBOX 085 250'] = '1560082';
	    $arr_articles['GO LIGHTBOX 100 250'] = '1560032';
	    $arr_articles['GO LIGHTBOX 185 250'] = '1560232';
	    $arr_articles['GO LIGHTBOX 200 250'] = '1560092';

	    $arr_articles['GO COUNTER L WHITE'] = '1560192';
	    $arr_articles['FUSSPLATTEN EINSEITIG'] = '352025';
	    $arr_articles['TÜR SET'] = '352005';
	    $arr_articles['SYSTEMVERBINDER FLEX'] = '352011';

	    return $arr_articles;
	};

	var getArticle = function(state) {
	    var cart = new Object();
	    var $arr_articles = arrArticle();

	    var addCart = function(prop,count) {
	        if (typeof count == 'undefined') count=1;
	        if (typeof cart[prop] === 'undefined') {
	            cart[prop] = count;
	        } else {
	            cart[prop] += count;
	        }
	    };

	    var getCart = function() {
	        var art = new Array();
	        var q = new Array();
	        for (var key in cart) {
	            if (cart[key]>0) {
	                if (typeof $arr_articles[key] !== 'undefined') {
	                    art.push($arr_articles[key]);
	                    q.push(Math.ceil(cart[key]));
	                } else {
	                    art.push(key);
	                    q.push(Math.ceil(cart[key]));
	                }
	            }
	        }
	        return '?products='+ art.join(',') + '&quantity=' + q.join(',');
	    }; 

	    var width = state.width;
	    var length = state.length;
	    if (state.wallsName == 'I') {
	        width = state.length;
	        length = state.width;
	    }
	    
	    for (var i1 = 0; i1<state.group.children.length; i1++) {
	        if (state.group.children[i1].isLightBox===true) {
	            addCart(state.group.children[i1].userData.name);
	            if (typeof state.group.children[i1].userData.foot!= 'undefined') {
	                addCart('FUSSPLATTEN EINSEITIG', state.group.children[i1].userData.foot);
	            }
	        }
	        for (var i2 = 0; i2<state.group.children[i1].children.length; i2++) {
	           if (state.group.children[i1].children[i2].isLightBox===true) {
	                addCart(state.group.children[i1].children[i2].userData.name);
	                if (typeof state.group.children[i1].children[i2].userData.foot!= 'undefined') {
	                    addCart('FUSSPLATTEN EINSEITIG', state.group.children[i1].children[i2].userData.foot);
	                }
	           }
	        }
	    }
	    
	    var article=state.wallsName+'-';
	    switch (width) {
	        case 1: article += 'A'; break;
	        case 2: article += 'B'; break;
	        case 3: article += 'C'; break;
	        case 4: article += 'D'; break;
	        case 5: article += 'E'; break;
	        case 6: article += 'F'; break;
	    }
	    article += length; 
	    if (state.cabin>0) article+='-K';
	    
	    if (state.wallsName=='L') {
	        addCart('SYSTEMVERBINDER FLEX', 1);
	    } else if (state.wallsName=='U') {
	        addCart('SYSTEMVERBINDER FLEX', 2);
	    }

	    if (state.cabin>0 && state.width>1 && state.length>1 && state.walls>1 ) addCart('TÜR SET', 1);
	    if (state.counter>0 && state.length>1) addCart('GO COUNTER L WHITE', state.counter);
	    if (state.counter == 1) {
	        article += '-C';
	    } else if (state.counter == 2) {
	        article += '-CC';
	    }
	    /* HIER WIEDER REINNEHMEN; WENN AUFBAUANLEITUNGEN IN SHOP HOCHGELADEN SIND
	        WICHTIG WICHTIG WICHTIG WICHTIG WICHTIG WICHTIG WICHTIG WICHTIG 
	        addCart(article,1) wieder reinnehmen */
	    //addCart(article,1);
	    
	    //REMOVE
	    //console.log('oredr '+ article +':',cart);
	    $("#oredr-info").html(getCart());

	    return {'cart':cart,'getCart':getCart()};
	};

	var showCost = function(state) {
	    var cart = getArticle(state).cart;
	    var summ = 0;
	    for (var key in cart) {
	        if (cart[key]>0) {
	            if (typeof state.arr_cost[key] !== 'undefined') {
	                summ+=parseInt(cart[key]) * parseFloat(state.arr_cost[key]);
	            }
	        }
	    }
	    //let price = summ.toLocaleString("EUR");
	    let price=[];
	    if (summ.toString().indexOf('.')!==-1) {
	        price = summ.toString().split('.');
	        if (price[1].length === 1) price[1] = price[1].toString() + '0';
	    } else {
	        price[0] = summ;
	        price[1] = '00';
	    }
	    var msg = `<div><span>Preis: </span><span class='price-big'>${price[0]}<span class='price-small'>${price[1]}</span>€</span></span></div><div><div>UVP exkl. MwSt.</div><div class='text-small'>Spezielle Reseller Konditionen werden im Warenkorb aktualisiert</div></div>`;
	    $("#price").html(msg);
	};

	var state = {
	    length:4,
	    width: 4,
	    height: 2,
	    cabin:0,
	    counter:0,
	    style1:0,
	    style2:0,

	    depthWall:0.15,
	    walls:2,
	   
	    wallsName:'',
	    countWalls:0,
	    
	    wallColor: '#fed765',
	    wallColor1: '#fed765',
	    wallColor2: '#fed765',

	    opacityWall:0.6,
	    
	    limits: {
	        length:[1,6],
	        width:[1,6], 
	        height:[2,2.5], 
	        walls:[1,3],
	        cabin:[0,1], 
	        counter:[0,2], 
	        style1:[0,1], 
	        style2:[0,1], 
	        textSize:[10,1000]
	    },

	    cabinProps: {
	        width:1.85,
	        depth:0.85
	    },
	    counterProps: {
	        width:1,
	        depth:0.4,
	        height:1,
	        offset:1
	    },

	    font:'sans-serif',
	    fontColor:'#ff3300',
	    textWall:'',
	    textSize:100,

	    wallpaper:false,
	    isUpdateWallpaper:false,
	    fileLogo:false,
	    logoScale:100,
	    canvasScale:100,
	    isClearDragObj:false,

	    logoOffset:[0,0],
	    textOffset:[0,0],

	    setLimits: function() {
	        var localLim = {
	            walls:[[1,3]],
	            length:[[1,6]],
	            width:[[1,6]],
	            cabin:[[0,1]],
	            counter:[[0,2]]
	        };

	        if (this.walls == 1) {
	            localLim.cabin.push([0,0]);
	            if (this.length<2) localLim.counter.push([0,0]);
	            if (this.width<2) localLim.counter.push([0,1]);
	            if (this.counter>0) localLim.length.push([2,6]);
	            if (this.counter>1) localLim.width.push([2,6]);
	            if (this.counter>1 && this.length<=2 && this.width<=2) localLim.walls.push([1,1]);
	            if (this.counter>0 && this.width==1) localLim.walls.push([1,1]);

	        } else if (this.walls == 2 ) {
	            if (this.width<2 || this.length<2) localLim.counter.push([0,0]);
	            if (this.width==2 && this.length==2) localLim.counter.push([0,1]);
	            if (this.counter>0) {
	                localLim.length.push([2,6]);
	                localLim.width.push([2,6]);
	                if (this.length < 3) localLim.walls.push([1,2]);
	            }

	            if (this.counter>1) {
	                if (this.width == 2) localLim.length.push([3,6]);
	                if (this.length == 2) localLim.width.push([3,6]);
	                if (this.length < 4 && this.cabin == 0) localLim.walls.push([1,2]);
	            }

	            if (this.width<2 || this.length<2) {
	                localLim.cabin.push([0,0]);
	            }
	            if (this.cabin>0) {
	                if (this.counter>0) {
	                    if (this.width == 2) localLim.length.push([3,6]);
	                    if (this.length == 2) localLim.width.push([3,6]);
	                }
	                if (this.counter>1) {
	                    localLim.length.push([3,6]);
	                    localLim.width.push([4,6]);
	                    if (this.length < 3) localLim.walls.push([1,2]);
	                    if (this.length<=4 && this.width==2) localLim.walls.push([1,2]);
	                    if (this.length==3 && this.width==3) localLim.walls.push([1,2]);
	                }
	                
	                if (this.width==2 && this.length==2) localLim.counter.push([0,0]);
	                if (this.width<=3 && this.length<=4) localLim.counter.push([0,1]);

	                localLim.width.push([2,6]);
	                localLim.length.push([2,6]);
	            }

	        } else if (this.walls == 3) {
	            if (this.width<2 || this.length<=2) localLim.counter.push([0,0]);
	            if (this.length==3 && this.cabin==0) localLim.counter.push([0,1]);
	            if (this.counter>0) {
	                localLim.length.push([3,6]);
	                localLim.width.push([2,6]);
	            }
	            if (this.counter>1 && this.cabin==0) {
	                localLim.length.push([4,6]);
	            }

	            localLim.length.push([2,6]);
	            if ((this.width<3 || this.length<2) && (this.width<2 || this.length<3)) {
	                localLim.cabin.push([0,0]);
	            }
	            if (this.length<3 && this.width<3) localLim.cabin.push([0,0]);

	            if (this.cabin>0) {
	                if (this.counter>1) {
	                    localLim.length.push([3,6]);
	                    localLim.width.push([3,6]);
	                    if (this.width==2) localLim.length.push([5,6]);
	                    if (this.width==3) localLim.length.push([4,6]);
	                    if (this.length==3) localLim.width.push([4,6]);
	                }
	                if (this.length<3) localLim.cabin.push([0,0]);
	                if (this.width<4) localLim.cabin.push([0,0]);
	                
	                if (this.length == 2) localLim.width.push([3,6]);   
	                if (this.width == 2) localLim.length.push([3,6]); 

	                if (this.length<=4 && this.width==2) localLim.counter.push([0,1]);
	                if (this.length==3 && this.width==3) localLim.counter.push([0,1]);

	                localLim.width.push([2,6]);
	            }

	        }
	       
	        if (this.cabin>0) {
	            if (this.length<3 && this.width<3) localLim.walls.push([2,2]);
	            localLim.walls.push([2,3]);
	        }
	        if (this.length<2) localLim.walls.push([1,2]);
	        
	        for (var name in localLim) {
	            this.limits[name][0] = localLim[name][0][0];
	            this.limits[name][1] = localLim[name][0][1];
	            for(var i=1; i<localLim[name].length; i++) {
	                if (this.limits[name][0]<localLim[name][i][0]) this.limits[name][0] = localLim[name][i][0];
	                if (this.limits[name][1]>localLim[name][i][1]) this.limits[name][1] = localLim[name][i][1];
	            }
	        }
	    },

	    checkLimits: function(value,type) {
	        if (type == 'height') value = parseFloat(value);
	        else value = parseInt(value);

	        if (type != 'length' && type != 'width')  {
	            if (typeof this.limits[type] !== 'undefined') {
	                if (value < this.limits[type][0]) {
	                    value = this.limits[type][0];
	                } else if (value > this.limits[type][1]) {
	                    value = this.limits[type][1];
	                }
	            }
	        }
	        
	        return value;
	    },
	    setNewValue: function() {
	        let arrTest = ['counter', 'cabin', 'walls'];
	        for (let key of arrTest) {
	            if (typeof state.limits[key] !== 'undefined') {
	                if (state[key] < state.limits[key][0]) {
	                    state[key] = state.limits[key][0];
	                    if (key == 'walls') {
	                        $("#wallValueTest").val(state[key]);
	                    } else {
	                        $("#"+key+"ValueTest").val(state[key]);
	                    }
	                } else if (state[key] > state.limits[key][1]) {
	                    state[key] = state.limits[key][1];
	                    if (key == 'walls') {
	                        $("#wallValueTest").val(state[key]);
	                    } else {
	                        $("#"+key+"ValueTest").val(state[key]);
	                    }
	                }
	            }
	        }
	    },
	    setOffButton: function() {
	        let arrTest = ['counter', 'cabin', 'walls'];
	        for (let key of arrTest) {
	            if (typeof state.limits[key] !== 'undefined') {
	                let decrement = $("input[name="+key+"]").closest(".container-font-size").find('.input-number-decrement');
	                let incriment = $("input[name="+key+"]").closest(".container-font-size").find('.input-number-increment');
	                decrement.find(">div.silver-circle").removeClass("silver-circle");
	                incriment.find(">div.silver-circle").removeClass("silver-circle");

	                if (state[key] == state.limits[key][0]) {
	                    decrement.find(">div").addClass("silver-circle");
	                }
	                if (state[key] == state.limits[key][1]) {
	                    incriment.find(">div").addClass("silver-circle");
	                }
	            }
	        }
	    },
	    setState: function(action, callback) {
	        if (typeof action === 'object') {
	            if (typeof this[action.type] !== "undefined") {
	                if (action.type=='width' || action.type=='height' || action.type=='length') {
	                    this.isClearDragObj = true;
	                }

	                if (action.type=='style1' || action.type=='style2' || action.type=='textSize' || action.type=='logoScale' || action.type=='height') {
	                    this[action.type] = this.checkLimits(action.value,action.type);
	                    if (typeof callback === 'function') callback(this[action.type]);
	                    this.needsUpdate=true;
	                } else if (action.type == 'walls' || action.type == 'cabin' || action.type == 'counter' || action.type=='width' || action.type=='length') {
	                    this[action.type] = this.checkLimits(action.value,action.type);
	                    this.setLimits();

	                    this.setNewValue();

	                    if (typeof callback === 'function') callback(this[action.type]);
	                    this.needsUpdate=true;
	                } else {
	                    this[action.type] = action.value;
	                    this.needsUpdate=true;
	                    this.isUpdateWallpaper=true;
	                }
	                
	            } else {
	                if (action.type == 'loadfileLogo') {
	                    this.fileLogo = action.value;
	                    this.needsUpdate=true;
	                    this.isUpdateWallpaper=true;
	                } else if (action.type == 'setColor') {
	                    this[action.name] = action.value;
	                    if (action.name == 'trimColor' || action.name == 'rollupColor') {
	                        this.isChangeColor = true;
	                    }
	                    this.needsUpdate=true;
	                 }
	            }
	            //подсчёт
	            setTimeout(function() {
	                showCost(state);
	            },400);

	            this.setOffButton();
	        }
	        return this;
	    },
	    getScene: function () {
	        //console.log(this.scene.toJSON());
	    },
	    arr_cost:[],
	    scene:null,
	    group:null,
	    texture:null,

	    is_find_position: false,
	    holeGroup:null,
	    baseUrl:'http://bydenis.com/3dconfiguration',
	    baseApiUrl:'https://www.pixlip.com',
	    submitUrl:'http://www.pixlip.com/dvsn/quick-cart/add',
	    controls:true,
	    needsUpdate:true,
	    needsUpdateCanvas:false,
	    printWall:{},
	    dragObj:{},
	    isCreateObj:{},
	    dragOffset:{'logoOffset':[0,0], 'textOffset':[0,0]},
	    printHoles:false
	};

	var buildFloor = function(scene) {
	    var g = new THREE.BoxBufferGeometry(state.length, 0.01, state.width);

	    var m = new THREE.MeshStandardMaterial( { color: 0x424242 } );
	    
	    var o = new THREE.Mesh(g,m);
	    o.position.y = -0.01/2;
	    o.position.z = -state.depthWall;
	    o.position.x = -state.depthWall;
	    scene.add(o);
	};

	var createAasteners = function(o,offset,height) {
	    var z_m = new THREE.MeshStandardMaterial( { color: 0xcccccc } );
	    var z_g = new THREE.BoxBufferGeometry(0.16, 0.01, 0.16);
	    var z_o = new THREE.Mesh(z_g,z_m);
	    z_o.position.y=-height/2 ;
	    z_o.position.z=state.depthWall;
	    z_o.position.x=offset;
	    o.add(z_o);
	};

	var cloneCanvas = function(canvas) {
	    var newCanvas = document.createElement('CANVAS');
	    var context = newCanvas.getContext('2d');

	    newCanvas.width = canvas.width;
	    newCanvas.height = canvas.height;

	    context.drawImage(canvas, 0, 0);

	    return newCanvas;
	};

	var getNameBox = function(w,h,_foot) {
	    var width = w*100;
	    var foot = 1;
	    if (width>100) foot = 1.5;
	    if (width==85) width ='085';
	    if (typeof _foot!='undefined') foot = _foot;

	    return { 'name': 'GO LIGHTBOX ' + width + ' ' + (h*100), 'foot': foot };
	};

	var buildWall = function(scene, witdh, height, offsetX, offsetZ, angel, offsetCanvas) {
	    var g = new THREE.BoxBufferGeometry(witdh-0.01, height, state.depthWall);

	    var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
	    var m2 = new THREE.MeshStandardMaterial( { color: 0xcccccc } );

	    var canvasMaterial = new THREE.MeshStandardMaterial( );
	    
	    const loader = new THREE.TextureLoader();

	    var m3 = new THREE.MeshBasicMaterial({map: loader.load('img/musterTexturPixlipgo.jpg')});

	    var repeatX, repeatY;
	    repeatX = witdh * 2448/ (height * 3264);

	    //
	    if (repeatX > 1) {
	        //fill the width and adjust the height accordingly
	        repeatX = 1;
	        repeatY =  height * 3264 / (witdh * 2448 );
	        m3.map.repeat.set(repeatX, repeatY);
	        m3.map.offset.y= (repeatY - 1) / 2 * -1;
	    } else {
	        //fill the height and adjust the width accordingly
	        repeatX = witdh * 2448/ (height * 3264);
	        repeatY = 1;
	        m3.map.repeat.set(repeatX, repeatY);
	        m3.map.offset.x = (repeatX - 1) / 2 * -1;
	    }
		    
	    if ( state.wallpaper!==false ) {
	        var _texture=new THREE.CanvasTexture(cloneCanvas(state.wallpaper));
	        canvasMaterial.map = _texture;
	        canvasMaterial.map.offset.set(offsetCanvas/(state.wallpaper.width/state.canvasScale),0);
	        canvasMaterial.map.repeat.set(witdh/(state.wallpaper.width/state.canvasScale),height/(state.wallpaper.height/state.canvasScale));
	        
	        _texture = true;
	        canvasMaterial.needsUpdate = true;
	    }
	    var o = new THREE.Mesh(g,[m1,m1,m1,m1,m3,m3]);

	    o.position.y = height/2;
	    o.position.x = offsetX;
	    o.position.z = offsetZ;
	    o.rotateY(angel);

	    var h_m = new THREE.MeshStandardMaterial( { color: 0xff3300 } );
	   
	    h_m.transparent = true;
	    h_m.opacity = 0;

	    witdh = Math.round(witdh*100)/100;
	    var arr_Frame = new Array();
	    if (state.cabin>0 && state.walls==2) { // L - cabinet
	        if (angel == 0) {
	            //передня
	            if(witdh == 1.85) arr_Frame = [1,0.85];
	            else if(witdh == 2.85) arr_Frame = [1, 1.85];
	            else if(witdh == 3.85) arr_Frame = [2, 1.85];
	            else if(witdh == 4.85) arr_Frame = [2, 1, 1.85];
	            else if(witdh == 5.85) arr_Frame = [2, 1.85, 2];
	        } else {
	            //левая стена
	            if(witdh == 1.85) arr_Frame = [1, 0.85];
	            else if(witdh == 2.85) arr_Frame = [1, 1.85];
	            else if(witdh == 3.85) arr_Frame = [1, 0.85, 2];
	            else if(witdh == 4.85) arr_Frame = [1, 1.85, 2];
	            else if(witdh == 5.85) arr_Frame = [1, 0.85, 2, 2];
	        }
	    } else if (state.cabin>0 && state.walls==3) { // U - cabinet
	        if (angel == 0) {
	            //передня
	            if(witdh == 1.7) arr_Frame = [0.85, 0.85];
	            else if(witdh == 2.7) arr_Frame = [0.85, 1.85];
	            else if(witdh == 3.7) arr_Frame = [1.85, 1.85];
	            else if(witdh == 4.7) arr_Frame = [2, 0.85, 1.85];
	            else if(witdh == 5.7) arr_Frame = [2, 1.85, 1.85];
	        } else if (angel == Math.PI/2) {
	            //левая стена
	            if(witdh == 1.85) arr_Frame = [1, 0.85];
	            else if(witdh == 2.85) arr_Frame = [1, 1.85];
	            else if(witdh == 3.85) arr_Frame = [1, 0.85, 2];
	            else if(witdh == 4.85) arr_Frame = [1, 1.85, 2];
	            else if(witdh == 5.85) arr_Frame = [1, 0.85, 2, 2];
	        } else {
	            //правая стена
	            if(witdh == 1.85) arr_Frame = [1.85];
	            else if(witdh == 2.85) arr_Frame = [1, 1.85];
	            else if(witdh == 3.85) {
	                if (state.length == 2) arr_Frame = [1, 0.85, 2];
	                else arr_Frame = [1.85, 2];
	            }
	            else if(witdh == 4.85) arr_Frame = [1, 1.85, 2];
	            else if(witdh == 5.85) {
	                if (state.length == 2) arr_Frame = [1, 0.85, 2, 2];
	                else arr_Frame = [1.85, 2, 2];
	            }
	        }

	    } else if(witdh == 0.85) arr_Frame = [0.85];
	    else if(witdh == 1) arr_Frame = [1];
	    else if(witdh == 1.7) arr_Frame = [0.85, 0.85];
	    else if(witdh == 1.85) arr_Frame = [1.85];
	    else if(witdh == 2) arr_Frame = [2];
	    else if(witdh == 2.7) arr_Frame = [1.85, 0.85];
	    else if(witdh == 2.85) arr_Frame = [0.85, 2];
	    else if(witdh == 3) arr_Frame = [2, 1];
	    else if(witdh == 3.7) arr_Frame = [1.85, 1.85];
	    else if(witdh == 3.85) arr_Frame = [1.85, 2];
	    else if(witdh == 4) arr_Frame = [2, 2];
	    else if(witdh == 4.7) arr_Frame = [1.85, 1, 1.85];
	    else if(witdh == 4.85) arr_Frame = [2, 0.85, 2];
	    else if(witdh == 5) arr_Frame = [2, 1, 2];
	    else if(witdh == 5.7) arr_Frame = [1.85, 2, 1.85];
	    else if(witdh == 5.85) arr_Frame = [2, 1.85, 2];
	    else if(witdh == 6) arr_Frame = [2, 2, 2];
	    
	    var flagDirection = false;
	    if (angel == Math.PI/2) {
	        flagDirection = true;
	    }
	    
	    var _offset= 0;
	    for (var i = 0; i<arr_Frame.length; i++) {
	        var h_g = new THREE.BoxBufferGeometry(arr_Frame[i], height+0.01, state.depthWall+0.01);
	        var h_o = new THREE.Mesh(h_g,h_m);
	            h_o.userData = getNameBox(arr_Frame[i],height);
	            h_o.name = h_o.userData.name;
	            h_o.isLightBox = true;
	            if (flagDirection) {
	                h_o.position.x = witdh/2 - arr_Frame[i]/2 - _offset;
	            } else {
	                h_o.position.x = -witdh/2 + arr_Frame[i]/2 + _offset;
	            }
	            _offset+=arr_Frame[i];
	            if (arr_Frame[i]>1) createAasteners(o, h_o.position.x, height);
	            createAasteners(o, h_o.position.x - arr_Frame[i]/2 + 0.18/2, height);
	            createAasteners(o, h_o.position.x + arr_Frame[i]/2 - 0.18/2, height);
	            
	        var box = new THREE.BoxHelper( h_o, 0x424242 );
	        o.add(h_o);
	        o.add(box);
	    }
	    
	    scene.add(o);
	};

	var buildCabin = function(scene) {
	    if (state.cabin>0 && state.walls>1 && state.width>1 && state.length>1 && (state.walls<3 || (state.width>2 || state.length>2) ) ) {
	        var cabin_width = state.cabinProps.width;
	        if (state.length<=3) cabin_width = 0.85;
	        var is_one = false;
	        if (state.length==2 && state.walls==3) {
	            cabin_width = 0.85;
	            is_one=true;
	        }

	        var g = new THREE.BoxBufferGeometry(cabin_width-0.01, state.height, state.depthWall);

	        var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
	        var m2 = new THREE.MeshStandardMaterial( { color: 0xfed765 } );
	            m2.color = new THREE.Color( state.wallColor1);

	        const loader = new THREE.TextureLoader();

	        var m3 = new THREE.MeshBasicMaterial({map: loader.load('img/musterTexturPixlipgo.jpg')});

	        var repeatX, repeatY;
	            repeatX = cabin_width * 2448/ (state.height * 3264);

	            //
	            if (repeatX > 1) {
	            //fill the width and adjust the height accordingly
	            repeatX = 1;
	            repeatY =  state.height * 3264 / (cabin_width * 2448 );
	            m3.map.repeat.set(repeatX, repeatY);
	            m3.map.offset.y= (repeatY - 1) / 2 * -1;
	            } else {
	            //fill the height and adjust the width accordingly
	            repeatX = cabin_width * 2448/ (state.height * 3264);
	            repeatY = 1;
	            m3.map.repeat.set(repeatX, repeatY);
	            m3.map.offset.x = (repeatX - 1) / 2 * -1;
	            }    

	        var obj = new THREE.Mesh(g,[m1,m1,m1,m1,m3,m3]);
	        var box = new THREE.BoxHelper( obj, 0x424242 );
	        obj.add(box);
	        
	        obj.position.y = state.height/2;
	        obj.position.x = -state.length/2 + cabin_width/2 ; 
	        obj.position.z = -state.width/2 + state.cabinProps.depth + state.depthWall/2; 

	        if (cabin_width>=1.85) createAasteners(obj, 0, state.height);
	        createAasteners(obj, cabin_width/2-0.2, state.height);
	        createAasteners(obj, -cabin_width/2+0.2, state.height);
	        
	        obj.userData = getNameBox(cabin_width,state.height, cabin_width==0.85? 1 : 1.5);
	        obj.name = obj.userData.name;
	        obj.isLightBox = true;
	        scene.add(obj);
	        if (is_one===true) {
	            //если широкий
	            var g = new THREE.BoxBufferGeometry(cabin_width-0.01, state.height, state.depthWall);

	            var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
	            var m2 = new THREE.MeshStandardMaterial( { color: 0xfed765 } );
	                m2.color = new THREE.Color( state.wallColor1);
	                const loader = new THREE.TextureLoader();

	                var m3 = new THREE.MeshBasicMaterial({map: loader.load('img/musterTexturPixlipgo.jpg')});
	        
	                var repeatX, repeatY;
	                    repeatX = cabin_width * 2448/ (state.height * 3264);
	        
	                    //
	                    if (repeatX > 1) {
	                    //fill the width and adjust the height accordingly
	                    repeatX = 1;
	                    repeatY =  state.height * 3264 / (cabin_width * 2448 );
	                    m3.map.repeat.set(repeatX, repeatY);
	                    m3.map.offset.y= (repeatY - 1) / 2 * -1;
	                    } else {
	                    //fill the height and adjust the width accordingly
	                    repeatX = cabin_width * 2448/ (state.height * 3264);
	                    repeatY = 1;
	                    m3.map.repeat.set(repeatX, repeatY);
	                    m3.map.offset.x = (repeatX - 1) / 2 * -1;
	                    }     

	            var obj = new THREE.Mesh(g,[m1,m1,m1,m1,m3,m3]);
	            var box = new THREE.BoxHelper( obj, 0x424242 );
	            obj.add(box);
	    
	            obj.position.y = state.height/2;
	            obj.position.x = -state.length/2 + cabin_width/2*3; 
	            obj.position.z = -state.width/2 + state.cabinProps.depth + state.depthWall/2; 

	            obj.userData = getNameBox(cabin_width,state.height,0);
	            obj.name = obj.userData.name;
	            obj.isLightBox = true;
	            scene.add(obj);
	        } else {
	            var g2 = new THREE.BoxGeometry(state.cabinProps.depth-0.01, state.height, state.depthWall);
	            var obj2 = new THREE.Mesh(g2,[m1,m1,m1,m1,m3,m3]);
	            var box2 = new THREE.BoxHelper( obj2, 0x424242 );
	            obj2.add(box2);
	    
	            obj2.position.y = state.height/2;
	            obj2.position.x = -state.length/2 + cabin_width + state.depthWall/2; 
	            obj2.position.z = -state.width/2 + state.cabinProps.depth/2 ; 
	            obj2.rotateY(Math.PI/2);
	            
	            obj2.userData = getNameBox(state.cabinProps.depth,state.height,0);
	            obj2.name = obj2.userData.name;
	            obj2.isLightBox = true;
	            scene.add(obj2);
	        }
	    }
	};

	var createCounter = function(x,z,angel) {
	    var g = new THREE.BoxBufferGeometry(state.counterProps.width, state.counterProps.height, state.counterProps.depth);

	    var m1 = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
	    var m2 = new THREE.MeshStandardMaterial( { color: 0xfed765 } );
	        m2.color = new THREE.Color( state.wallColor1);
	        const loader = new THREE.TextureLoader();

	    var m3 = new THREE.MeshBasicMaterial({map: loader.load('img/musterTexturPixlipgo.jpg')});

	    var repeatX, repeatY;
	    repeatX = state.counterProps.width * 2448/ (state.counterProps.height * 3264);

	    //
	    if (repeatX > 1) {
	        //fill the width and adjust the height accordingly
	        repeatX = 1;
	        repeatY =  state.counterProps.height * 3264 / (state.counterProps.width * 2448 );
	        m3.map.repeat.set(repeatX, repeatY);
	        m3.map.offset.y= (repeatY - 1) / 2 * -1;
	    } else {
	        //fill the height and adjust the width accordingly
	        repeatX = state.counterProps.width * 2448/ (state.counterProps.height * 3264);
	        repeatY = 1;
	        m3.map.repeat.set(repeatX, repeatY);
	        m3.map.offset.x = (repeatX - 1) / 2 * -1;
	    }
	            
	    var o = new THREE.Mesh(g,[m1,m1,m1,m1,m3,m3]);


	    var box = new THREE.BoxHelper( o, 0x424242 );
	    o.add(box);

	    o.position.x = x - state.depthWall;
	    o.position.y = state.counterProps.height/2;
	    o.position.z = z -state.depthWall;
	    o.rotateY(angel);
	    
	    return o;
	};

	var buildCounter = function(scene) {
	    if (state.length>1) {
	        if (state.walls == 1)  {
	            if (state.counter>0) scene.add(createCounter(state.length/2 - state.counterProps.depth/2, -state.width/2 + state.counterProps.width/2,Math.PI/2)); 

	            if (state.counter==2) scene.add(createCounter(state.length/2 - state.counterProps.depth/2, state.width/2 - state.counterProps.width/2,Math.PI/2)); 
	        } else if (state.walls == 2) {
	            if (state.counter==1) {
	                scene.add(createCounter(state.length/2 - state.counterProps.width/2,state.width/2 - state.counterProps.width/2,Math.PI/4)); 
	            } else if (state.counter==2) {
	                if (state.cabin>0) {
	                    if (state.width > 1 && state.length > 1) {
	                        var offsetX = 1;
	                        var offsetZ = 0.65;
	                        if (state.length == 2 ) scene.add(createCounter(-state.length/2 + state.counterProps.width/2 + state.depthWall+0.01, state.width/2 - state.counterProps.depth/2, 0)); 
	                        else scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall+0.01 - offsetX, state.width/2 - state.counterProps.depth/2, 0)); 
	                        
	                        if (state.width == 2 ) scene.add(createCounter(state.length/2 - state.counterProps.depth/2, -state.width/2 + state.counterProps.width/2 + state.depthWall+0.01, Math.PI/2)); 
	                        else scene.add(createCounter(state.length/2 - state.counterProps.depth/2, state.width/2 - state.counterProps.width/2 - state.depthWall-0.01-offsetZ, Math.PI/2)); 
	                    }
	                } else {
	                    scene.add(createCounter(state.length/2 - state.counterProps.depth/2, -state.width/2 + state.counterProps.width/2 + state.depthWall+0.01, Math.PI/2)); 
	                    scene.add(createCounter(-state.length/2 + state.counterProps.width/2 + state.depthWall+0.01, state.width/2 - state.counterProps.depth/2, 0)); 
	                }
	            }
	        } else if (state.walls == 3) {
	            if (state.cabin>0) {
	                if (state.counter>0) scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall-0.01, state.width/2 - state.counterProps.depth/2, 0)); 
	                if (state.counter==2) {
	                    if (state.length==3 && state.width>3) scene.add(createCounter(state.length/2 - state.counterProps.depth/2 - state.depthWall-0.01 - state.counterProps.width, state.width/2 - state.counterProps.width/2 - state.counterProps.depth, Math.PI/2)); 
	                    else if (state.length>3) scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall-0.01 - state.counterProps.width, state.width/2 - state.counterProps.depth/2, 0)); 
	                }
	            } else {
	                if (state.counter>0) scene.add(createCounter(-state.length/2 + state.counterProps.width/2 + state.depthWall+0.01, state.width/2 - state.counterProps.depth/2, 0)); 
	                if (state.counter==2) scene.add(createCounter(state.length/2 - state.counterProps.width/2 - state.depthWall-0.01, state.width/2 - state.counterProps.depth/2, 0)); 
	            }
	        }
	    }
	};

	var creatText = function(ctx) {
	    var type = 'textOffset';
	    ctx.fillStyle = state.fontColor;
	    ctx.font = (state.textSize/5)+"px "+(state.font);

	    var text = state.textWall.split('\n');
	    var lengthText = 0;

	    var lineheight = state.textSize/5;
	    var x = state.dragOffset[type][0]*state.canvasScale;
	    if (typeof state.dragObj[type] != 'undefined')  if (typeof state.dragObj[type].userData != 'undefined') x += state.dragObj[type].userData.wallOffset*state.canvasScale;
	    var y = state.dragOffset[type][1]*state.canvasScale;

	    for (var i = 0; i<text.length; i++) {
	        ctx.fillText(text[i], x, y + ((i+1)*lineheight) );
	        if (ctx.measureText(text[i]).width>lengthText) lengthText=ctx.measureText(text[i]).width;
	    } 
	    
	    state.printWall[type] = {};
	    state.printWall[type]['imageX'] = lengthText;
	    state.printWall[type]['imageY'] = (state.textSize/5)*(text.length);
	    
	};

	var creatWallpaper = function(callback) {
	    
	    var _Canvas=document.createElement("CANVAS");
	    var c_x = 0;

	    if (state.walls>0) c_x +=state.width;
	    if (state.walls>1) c_x +=state.length;
	    if (state.walls>2) c_x +=state.width;
	    c_x*=state.canvasScale;

	    var c_y = state.height*state.canvasScale;
	    _Canvas.width=c_x;
	    _Canvas.height=c_y;
	    var _Context=_Canvas.getContext('2d');
	    _Context.fillStyle=state.wallColor1;
	    _Context.fillRect(0,0,c_x,c_y);
	    
	    if (state.fileLogo!==false) {
	        var image = new Image();
	        state.wallpaperImage = image;
	        image.src = state.fileLogo;
	        image.setAttribute('crossOrigin', 'anonymous');
	    
	        image.onload = function(e) {

	            var logoScale = state.logoScale/state.canvasScale/10;
	            var imageX = image.width*logoScale;
	            var imageY = image.height*logoScale;

	            var type = 'logoOffset';
	            state.printWall[type] = {};
	            state.printWall[type]['imageX'] = imageX;
	            state.printWall[type]['imageY'] = imageY;
	            
	            var _offsetX = state.dragOffset['logoOffset'][0];
	            if (typeof state.dragObj[type] != 'undefined')  if (typeof state.dragObj[type].userData != 'undefined') _offsetX += state.dragObj[type].userData.wallOffset;
	            _Context.drawImage(this, parseInt(_offsetX * state.canvasScale), parseInt(state.dragOffset[type][1] * state.canvasScale), imageX, imageY );

	            creatText(_Context);
	            state.wallpaper = _Canvas;

	            callback();
	        };
	    } else {
	        creatText(_Context);
	        state.wallpaper = _Canvas;
	        callback();
	    }
	};

	var clearDragObj = function(type) {
	    if (typeof state.dragObj[type] != 'undefined') {
	        state.dragGroup.remove(state.dragObj[type]);
	        state.dragObj[type] = {};

	        state.printWall[type] = {};
	        state.printWall[type]['imageX'] = 0;
	        state.printWall[type]['imageY'] = 0;
	    
	        state.dragOffset[type][0]=0;
	        state.dragOffset[type][1]=0;
	    }
	};

	var creatDragObj = function(type,angel) {
	    if ((state.fileLogo!==false && type=='logoOffset') || (state.textWall!='' && type=='textOffset')) {
	        state.isCreateObj[type] = false;
	        var _wallOffset = 0;
	        var _wall = 0;
	        if (typeof state.dragObj[type] != 'undefined') if (typeof state.dragObj[type].userData!='undefined') _wallOffset = state.dragObj[type].userData.wallOffset;
	        if (typeof state.dragObj[type] != 'undefined') if (typeof state.dragObj[type].userData!='undefined') _wall = state.dragObj[type].userData.wall;

	        state.dragGroup.remove(state.dragObj[type]);
	        
	        var imageX = state.printWall[type]['imageX'];
	        var imageY = state.printWall[type]['imageY'];

	        var g = new THREE.BoxGeometry(imageX/state.canvasScale, imageY/state.canvasScale, 0.01);
	        var m = new THREE.MeshStandardMaterial( { color: 0xFF3300 } );
	        m.transparent=true;
	        m.opacity=0;
	        var dragObj = new THREE.Mesh(g,m);
	        state.dragObj[type] = dragObj;

	        dragObj.userData.name = type;
	        dragObj.userData.wallOffset = _wallOffset;
	        dragObj.userData.x = imageX/state.canvasScale;
	        dragObj.userData.y = imageY/state.canvasScale;
	        
	        if (_wall==1) {
	            angel = 0;
	        } else if (_wall==2) {
	            angel = -Math.PI/2;
	        } else if (_wall==3) {
	            angel = Math.PI;
	        }

	        var offsetLayers = 0.01;
	        if (type=='textOffset') offsetLayers=0.015;
	        if (angel===Math.PI/2) {
	            dragObj.userData.wall = 0;
	            dragObj.userData.offsetX = state.width/2-dragObj.userData.x/2 - state.depthWall;
	            dragObj.userData.offsetZ = -state.length/2+offsetLayers;

	            dragObj.position.x=dragObj.userData.offsetZ;
	            dragObj.position.z=dragObj.userData.offsetX-state.dragOffset[type][0];
	        } else if (angel===0) {
	            dragObj.userData.wall = 1;
	            dragObj.userData.offsetX = -state.width/2+offsetLayers;
	            dragObj.userData.offsetZ = -state.length/2 + dragObj.userData.x/2;

	            dragObj.position.x=dragObj.userData.offsetZ+state.dragOffset[type][0];
	            dragObj.position.z=dragObj.userData.offsetX;
	        } else if (angel===-Math.PI/2) {
	            dragObj.userData.wall = 2;
	            dragObj.userData.offsetX = -state.width/2+dragObj.userData.x/2;
	            dragObj.userData.offsetZ = state.length/2 - offsetLayers - state.depthWall;

	            dragObj.position.x=dragObj.userData.offsetZ;
	            dragObj.position.z=dragObj.userData.offsetX+state.dragOffset[type][0];
	        } else if (angel===Math.PI) {
	            dragObj.userData.wall = 3;
	            dragObj.userData.offsetX = state.width/2-offsetLayers;
	            dragObj.userData.offsetZ = state.length/2 - dragObj.userData.x/2;
	            
	            dragObj.position.x=dragObj.userData.offsetZ-state.dragOffset[type][0];
	            dragObj.position.z=dragObj.userData.offsetX;
	        }
	        
	        dragObj.userData.offsetY = state.height-imageY/2/state.canvasScale;
	        dragObj.position.y=dragObj.userData.offsetY-state.dragOffset[type][1];

	        dragObj.rotateY(angel);

	        state.dragGroup.add(dragObj);
	    } else if ((state.textWall=='' && type=='textOffset') || (state.fileLogo===false && type=='logoOffset')) {
	        clearDragObj(type);
	    }    
	};

	var build = function(callbck) {
	    var group=new THREE.Group();
	    
	    if (state.isClearDragObj===true) {
	        state.isClearDragObj = false;
	    }
	    creatWallpaper(function() {
	        var offsetCanvas = 0;
	        state.isCreateObj['logoOffset'] = true;
	        state.isCreateObj['textOffset'] = true;
	        
	        //left
	        state.wallsName = '';
	        if (state.walls>0) {
	            var wall2 = 0;
	            var wall2_offset = -state.depthWall;
	            if (state.walls>1) {
	                wall2 = state.depthWall;
	                wall2_offset = -state.depthWall/2;
	            } 
	            buildWall(group, state.width-wall2, state.height, -state.length/2-state.depthWall/2, wall2_offset, Math.PI/2, offsetCanvas);
	            if (typeof state.dragObj['logoOffset'] === 'undefined' || state.isCreateObj['logoOffset']) creatDragObj('logoOffset', Math.PI/2);
	            if (typeof state.dragObj['textOffset'] === 'undefined' || state.isCreateObj['textOffset']) creatDragObj('textOffset', Math.PI/2);
	            offsetCanvas+=state.width-wall2;
	            state.wallsName = 'I';
	        } 
	        //right
	        if (state.walls>1) {
	            var wall3 = 0;
	            if (state.walls>2) wall3 = state.depthWall;
	            buildWall(group, state.length-state.depthWall-wall3, state.height, -state.depthWall/2-wall3/2, -state.width/2-state.depthWall/2, 0, offsetCanvas);
	            if (typeof state.dragObj['logoOffset'] === 'undefined' || state.isCreateObj['logoOffset']) creatDragObj('logoOffset', 0 );
	            if (typeof state.dragObj['textOffset'] === 'undefined' || state.isCreateObj['textOffset']) creatDragObj('textOffset', 0 );
	            offsetCanvas+=state.length-state.depthWall-wall3;
	            state.wallsName = 'L';
	        }
	        //F-left
	        if (state.walls>2) { 
	            if (state.length>1) {
	                buildWall(group, state.width-state.depthWall, state.height, state.length/2-state.depthWall/2-state.depthWall, -state.depthWall/2, -Math.PI/2, offsetCanvas);
	                if (typeof state.dragObj['logoOffset'] === 'undefined' || state.isCreateObj['logoOffset']) creatDragObj('logoOffset', -Math.PI/2);
	                if (typeof state.dragObj['textOffset'] === 'undefined' || state.isCreateObj['textOffset']) creatDragObj('textOffset', -Math.PI/2);
	                offsetCanvas+=state.width-state.depthWall;
	                state.wallsName = 'U';
	            }
	        }
	       
	        state.isUpdateWallpaper=false;

	        buildCabin(group);
	        
	        buildFloor(group);
	    
	        //left
	        buildCounter(group);
	    
	        state.scene.remove(state.group);
	        state.scene.add(group);
	        state.group = group;
	        state.needsUpdate=false;
	        callbck();
	    });
	};

	var threeLight = function(scene) {
	    var spotLight_big = new THREE.SpotLight( 0xffffe3, 0.2 );
	    spotLight_big.position.set( -200, 50, 200 );

	    spotLight_big.angle=Math.PI;
	    spotLight_big.penumbra=true;
	    
	    // var helper = new THREE.CameraHelper( spotLight_big.shadow.camera );
	    // scene.add( helper );
	    //var spotLightHelper_big = new THREE.SpotLightHelper( spotLight_big );
	    // scene.add( spotLightHelper_big );
	    scene.add(spotLight_big);

	    var spotLight_back = new THREE.SpotLight( 0xffffff, 0.2 );
	        spotLight_back.position.set( 200, 50, -200 );
	        spotLight_back.angle=Math.PI;
	        spotLight_back.penumbra=true;
	     //   scene.add(spotLight_back);

	    //var spotLightHelper_back = new THREE.SpotLightHelper( spotLight_back );
	    //     scene.add( spotLightHelper_back );


	    var spotLight_front = new THREE.SpotLight( 0xffffff, 0.5 );
	    spotLight_front.position.set( 200, 50, 200 );
	    spotLight_front.angle=Math.PI;
	    spotLight_front.penumbra=true;
	        scene.add(spotLight_front);

	    //var spotLightHelper_front = new THREE.SpotLightHelper( spotLight_front );
	    //     scene.add( spotLightHelper_front );

	    var spotLight_top = new THREE.SpotLight( 0xffffff, 0.4 );
	    spotLight_top.position.set( -30, 300, 100 );
	    spotLight_top.penumbra=true;
	    spotLight_top.angle=Math.PI/4;
	        scene.add(spotLight_top);

	    var ambient=new THREE.AmbientLight(0xb9cdff,0.4);
	    ambient.position.set(5000,5000,5000);
	    scene.add(ambient);
	};

	var eventDragStart = function(event) {
	    state.controls.enableRotate=false;
	    event.object.material.opacity = 0.4;
	};

	var eventDragEnd = function(event) {
	    state.controls.enableRotate=true;
	    event.object.material.opacity = 0;
	    state.needsUpdate=true;
	};

	var eventDrag = function(event) {
	    var offsetLayers = 0.01;
	    if (typeof event.object.userData != 'undefined') if (typeof event.object.userData.name != 'undefined') if (event.object.userData.name=='textOffset') offsetLayers=0.015;
	    if (event.object.userData.wall==0) {
	        event.object.position.x = event.object.userData.offsetZ;
	        
	        state.dragOffset[event.object.userData.name][0] =  event.object.userData.offsetX - event.object.position.z;
	        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;
	        
	        if (state.dragOffset[event.object.userData.name][0] > state.width - event.object.userData.x/2 && state.walls>1) {
	            event.object.userData.wall = 1;
	            event.object.userData.wallOffset = state.width;

	            event.object.rotateY(Math.PI/2);
	           
	            event.object.userData.offsetX = -state.width/2+offsetLayers;
	            event.object.userData.offsetZ = -state.length/2 + event.object.userData.x/2;

	            event.object.position.x=event.object.userData.offsetZ;
	            event.object.position.z=event.object.userData.offsetX;

	            state.dragOffset[event.object.userData.name][0] = 0;
	        }
	    } else if (event.object.userData.wall==1) {
	        event.object.position.z = event.object.userData.offsetX;
	        
	        state.dragOffset[event.object.userData.name][0] =  -(event.object.userData.offsetZ - event.object.position.x);
	        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;

	        if (state.dragOffset[event.object.userData.name][0] < -event.object.userData.x/2 && state.walls>0) {
	            event.object.userData.wall = 0;
	            event.object.userData.wallOffset = 0;

	            event.object.rotateY(-Math.PI/2);
	            
	            event.object.userData.offsetX = state.width/2-event.object.userData.x/2;
	            event.object.userData.offsetZ = -state.length/2+offsetLayers;

	            event.object.position.x = event.object.userData.offsetZ;
	            event.object.position.z = -event.object.userData.offsetX;
	        } else if (state.dragOffset[event.object.userData.name][0] > state.length - event.object.userData.x/2 && state.walls>2) {
	            event.object.userData.wall = 2;
	            event.object.userData.wallOffset += state.length;

	            event.object.rotateY(Math.PI/2);

	            event.object.userData.offsetX = -state.width/2 + event.object.userData.x/2;
	            event.object.userData.offsetZ = state.length/2-offsetLayers - state.depthWall;

	            event.object.position.x= event.object.userData.offsetZ;
	            event.object.position.z= event.object.userData.offsetX;
	        }
	    } else if (event.object.userData.wall==2) {
	        event.object.position.x = event.object.userData.offsetZ;
	        
	        state.dragOffset[event.object.userData.name][0] =  -(event.object.userData.offsetX - event.object.position.z);
	        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;

	        if (state.dragOffset[event.object.userData.name][0] < -event.object.userData.x/2 && state.walls>1) {
	            event.object.userData.wall = 1;
	            event.object.userData.wallOffset -= state.length;

	            event.object.rotateY(-Math.PI/2);
	            
	            event.object.userData.offsetX = -state.width/2+offsetLayers;
	            event.object.userData.offsetZ = -state.length/2 + event.object.userData.x/2;

	            event.object.position.x=-event.object.userData.offsetZ;
	            event.object.position.z=event.object.userData.offsetX;
	        } else if (state.dragOffset[event.object.userData.name][0] > state.width - event.object.userData.x/2 && state.walls===3) {
	            event.object.userData.wall = 3;
	            event.object.userData.wallOffset += state.width;

	            event.object.rotateY(Math.PI/2);

	            event.object.userData.offsetX = state.width/2-offsetLayers;
	            event.object.userData.offsetZ = state.length/2 - event.object.userData.x/2;
	            
	            event.object.position.x=event.object.userData.offsetZ;
	            event.object.position.z=event.object.userData.offsetX;
	        }
	    } else if (event.object.userData.wall==3) {
	        event.object.position.z = event.object.userData.offsetX;

	        state.dragOffset[event.object.userData.name][0] =  event.object.userData.offsetZ - event.object.position.x;
	        state.dragOffset[event.object.userData.name][1] =  event.object.userData.offsetY - event.object.position.y;

	        if (state.dragOffset[event.object.userData.name][0] < -event.object.userData.x/2 && state.walls>2) {
	            event.object.userData.wall = 2;
	            event.object.userData.wallOffset -= state.width;

	            event.object.rotateY(-Math.PI/2);
	            
	            event.object.userData.offsetX = -state.width/2+ event.object.userData.x/2;
	            event.object.userData.offsetZ = state.length/2-offsetLayers;

	            event.object.position.x = event.object.userData.offsetZ;
	            event.object.position.z = -event.object.userData.offsetX;
	        } 
	    }
	};

	var submit = function() {
	    var href = state.submitUrl + getArticle(state).getCart;
	    window.open(
	        href,
	        '_blank'
	    );
	};

	async function postData(url = '', data = {}) {
	    const response = await fetch(url, {
	      method: 'POST', // *GET, POST, PUT, DELETE, etc.
	      //mode: 'cors', // no-cors, *cors, same-origin
	      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	      //credentials: 'same-origin', // include, *same-origin, omit
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      //redirect: 'follow', // manual, *follow, error
	      //referrerPolicy: 'no-referrer', // no-referrer, *client
	      body: JSON.stringify(data) // body data type must match "Content-Type" header
	    });
	    return await response.json(); // parses JSON response into native JavaScript objects
	}

	async function postGet(url = '', token='') {
	    const response = await fetch(url, {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json',
	        'Authorization': token
	      },
	    });
	    return await response.json(); // parses JSON response into native JavaScript objects
	}

	var getCost = function(state,callback) {
	  
	  let data = { "client_id": "administration", "grant_type": "password", "scopes": "read", "username": "Kaman", "password": "Kaman_Kaman" };
	  postData(state.baseApiUrl+'/api/oauth/token', data)
	    .then((data) => {
	        if (typeof data.access_token != 'undefined') {
	            var token = data.access_token;
	            var arr_articles = arrArticle();
	            var all_answer = Object.keys(arr_articles).length;

	            for (let productNumber in arr_articles) {
	                let get_url = state.baseApiUrl+'/api/product?filter[productNumber]='+arr_articles[productNumber];
	                postGet(get_url,token).then((data) => {
	                    //state.arr_cost[productNumber] = data.data[0].attributes.price[0].gross;
	                    state.arr_cost[productNumber] = data.data[0].attributes.price[0].net;
	                    all_answer--;
	                    if ( all_answer == 0 ) {
	                        callback();
	                    }
	                });
	            }
	        }
	    });
	};

	class ARButton {
	  static createButton(renderer, sessionInit = {}) {
	    const button = document.createElement("button");

	    function showStartAR(/*device*/) {
	      if (sessionInit.domOverlay === undefined) {
	        const overlay = document.createElement("div");
	        overlay.style.display = "none";
	        document.body.appendChild(overlay);

	        const svg = document.createElementNS(
	          "http://www.w3.org/2000/svg",
	          "svg"
	        );
	        svg.setAttribute("width", 38);
	        svg.setAttribute("height", 38);
	        svg.style.position = "absolute";
	        svg.style.right = "20px";
	        svg.style.top = "20px";
	        svg.addEventListener("click", function () {
	          currentSession.end();
	        });
	        overlay.appendChild(svg);

	        const path = document.createElementNS(
	          "http://www.w3.org/2000/svg",
	          "path"
	        );
	        path.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28");
	        path.setAttribute("stroke", "#fff");
	        path.setAttribute("stroke-width", 2);
	        svg.appendChild(path);

	        if (sessionInit.optionalFeatures === undefined) {
	          sessionInit.optionalFeatures = [];
	        }

	        sessionInit.optionalFeatures.push("dom-overlay");
	        sessionInit.domOverlay = { root: overlay };
	      }

	      //

	      let currentSession = null;

	      async function onSessionStarted(session) {
	        session.addEventListener("end", onSessionEnded);

	        renderer.xr.setReferenceSpaceType("local");

	        await renderer.xr.setSession(session);

	        button.textContent = "STOP AR";
	        sessionInit.domOverlay.root.style.display = "";

	        currentSession = session;
	      }

	      function onSessionEnded(/*event*/) {
	        currentSession.removeEventListener("end", onSessionEnded);

	        button.textContent = "START AR";
	        sessionInit.domOverlay.root.style.display = "none";

	        currentSession = null;
	      }

	      //

	      button.style.display = "";

	      button.style.cursor = "pointer";
	      button.style.left = "calc(50% - 50px)";
	      button.style.width = "100px";

	      button.textContent = "START AR";

	      button.onmouseenter = function () {
	        button.style.opacity = "1.0";
	      };

	      button.onmouseleave = function () {
	        button.style.opacity = "0.5";
	      };

	      button.onclick = function () {
	        if (currentSession === null) {
	          navigator.xr
	            .requestSession("immersive-ar", sessionInit)
	            .then(onSessionStarted);
	        } else {
	          currentSession.end();
	        }
	      };
	    }

	    function disableButton() {
	      button.style.display = "";

	      button.style.cursor = "auto";
	      button.style.left = "calc(50% - 75px)";
	      button.style.width = "150px";

	      button.onmouseenter = null;
	      button.onmouseleave = null;

	      button.onclick = null;
	    }

	    function showARNotSupported() {
	      disableButton();

	      button.textContent = "AR NOT SUPPORTED";
	    }

	    function showARNotAllowed(exception) {
	      disableButton();

	      console.warn(
	        "Exception when trying to call xr.isSessionSupported",
	        exception
	      );

	      button.textContent = "AR NOT ALLOWED";
	    }

	    function stylizeElement(element) {
	      element.style.position = "absolute";
	      element.style.bottom = "20px";
	      element.style.padding = "12px 6px";
	      element.style.border = "1px solid #0071E3";
	      element.style.borderRadius = "4px";
	      element.style.background = "#0071E3";
	      element.style.color = "#fff";
	      element.style.font = "normal 13px sans-serif";
	      element.style.textAlign = "center";
	      element.style.opacity = "0.5";
	      element.style.outline = "none";
	      element.style.zIndex = "999";
	    }

	    if ("xr" in navigator) {
	      button.id = "ARButton";
	      button.style.display = "none";

	      stylizeElement(button);

	      navigator.xr
	        .isSessionSupported("immersive-ar")
	        .then(function (supported) {
	          supported ? showStartAR() : showARNotSupported();
	        })
	        .catch(showARNotAllowed);

	      return button;
	    } else {
	      const message = document.createElement("a");

	      if (window.isSecureContext === false) {
	        message.href = document.location.href.replace(/^http:/, "https:");
	        message.innerHTML = "WEBXR NEEDS HTTPS"; // TODO Improve message
	      } else {
	        message.href = "https://immersiveweb.dev/";
	        message.innerHTML = "WEBXR NOT AVAILABLE";
	      }

	      message.style.left = "calc(50% - 90px)";
	      message.style.width = "180px";
	      message.style.textDecoration = "none";

	      stylizeElement(message);

	      return message;
	    }
	  }
	}

	// console.log(ARButton);

	var camera, scene, renderer, controls;

	function init() {
	  var container = document.getElementById("canvas-standgenerator");
	  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	  renderer.setPixelRatio(window.devicePixelRatio);
	  renderer.setSize(container.clientWidth, container.clientHeight);

	  camera = new THREE.PerspectiveCamera(
	    75,
	    container.clientWidth / container.clientHeight,
	    0.1,
	    2000
	  );
	  state.camera = camera;
	  camera.position.y = state.height * 0.7;
	  camera.position.z = state.length * 0.9;
	  camera.position.x = state.width * 0.9;

	  scene = new THREE.Scene();
	  state.scene = scene;

	  //Add an AR Button to the DOM
	  const arButton = ARButton.createButton(renderer, {
	    requiredFeatures: ["hit-test"],
	  });
	  console.log(arButton);

	  // container.appendChild(arButton);
	  // renderer.xr.enabled = true;
	  setupXR();

	  window.addEventListener("resize", onWindowResize, false);

	  function onWindowResize() {
	    camera.aspect = container.clientWidth / container.clientHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize(container.clientWidth, container.clientHeight);
	  }

	  container.appendChild(renderer.domElement);

	  // Create the AR button element, configure our XR session, and append it to the DOM.
	  document.body.appendChild(arButton);

	  threeLight(scene);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	  controls.screenSpacePanning = true;

	  // controls.target = new THREE.Vector3(0, 3, 0);
	  controls.enableDamping = true;
	  controls.dampingFactor = 0.08;
	  controls.enableZoom = true;
	  controls.minPolarAngle = Math.PI / 4;
	  controls.maxPolarAngle = Math.PI / 2;
	  controls.minDistance = 4;
	  controls.maxDistance = 12;
	  controls.enablePan = false;
	  controls.rotateSpeed = 1.5;

	  state.controls = controls;

	  var dragGroup = new THREE.Group();
	  state.dragGroup = dragGroup;

	  state.dragControls = new THREE.DragControls(
	    [state.dragGroup],
	    camera,
	    renderer.domElement
	  );
	  state.dragControls.transformGroup = false;

	  state.dragControls.addEventListener("dragstart", eventDragStart);
	  state.dragControls.addEventListener("dragend", eventDragEnd);
	  state.dragControls.addEventListener("drag", eventDrag);

	  scene.add(dragGroup);

	  getCost(state, function () {
	    showCost(state);
	  });
	  animate();
	}

	function groundDetector() {
	  var reticle = new THREE.Mesh(
	    new THREE.RingBufferGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
	    new THREE.MeshBasicMaterial()
	  );

	  reticle.matrixAutoUpdate = false;
	  reticle.visible = false;

	  scene.add(reticle);
	}

	function setupXR() {
	  renderer.xr.enabled = true;
	  groundDetector();
	}

	function requestHitTestSource() {
	  const session = renderer.xr.getSession();
	  session.requestReferenceSpace("viewer").then(function (referenceSpace) {
	    session
	      .requestHitTestSource({ space: referenceSpace })
	      .then(function (source) {
	        hitTestSource = source;
	      });
	  });

	  session.addEventListener("end", function () {
	    hitTestSourceRequested = false;
	    hitTestSource = null;
	    referenceSpace = null;
	  });

	  hitTestSourceRequested = true;
	}

	function getHitTestResults(frame) {
	  const hitTestResults = frame.getHitTestResults(hitTestSource);
	  if (hitTestResults.length) {
	    const referenceSpace = renderer.xr.getReferenceSpace();
	    const hit = hitTestResults[0];
	    const pose = hit.getPose(referenceSpace);

	    reticle.visible = true;
	    reticle.matrix.fromArray(pose.transform.matrix);
	  } else {
	    reticle.visible = false;
	  }
	}

	function animate() {
	  // if (state.needsUpdateCanvas!==false) updateCanvas();
	  if (state.needsUpdate === true) {
	    build(function () {
	      render();
	    });
	  } else {
	    render();
	  }
	}

	function render(timestamp, frame) {
	  controls.update();

	  //AR Hit Test Source
	  if (frame) {
	    if (hitTestSourceRequested === false) requestHitTestSource();

	    if (hitTestSource) getHitTestResults(frame);
	  }

	  renderer.render(scene, camera);
	  requestAnimationFrame(animate);
	}

	exports.init = init;
	exports.state = state;
	exports.submit = submit;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
