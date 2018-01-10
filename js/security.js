var app;
var config = {

}
var security = [];
function init(c){
    app.background=new THREE.Color( 0xD3D3D3 );
    security.versions = [];
    security.div3d = document.getElementById('div3d');
    
    hide_other();
    create_panels(app.query('/buildings[1]/floors[2]/things').query('[物体类型=摄像头]'),"hello");
    security.versions.forEach(function (t) { app.debug.scene.add(t);t.visible=false });
    camSign = document.querySelectorAll('.signCam');
    create_camera(window.innerWidth - 316,0);
    set_ui();
    var bPOS=app.buildings[0].floors[1].position;
    app.camera.flyTo({
        position: [bPOS[0]+30, bPOS[1]+39, bPOS[2]-39],
        target: [bPOS[0]+17,bPOS[1]-10, bPOS[2]],
        time: 1000
    });
}
window.onload = function () {
    app = new t3d.App({
        el: "div3d",
        // url: "https://speech.uinnova.com/static/models/security2",
        url: "https://uinnova-model.oss-cn-beijing.aliyuncs.com/scenes/security2",
        ak:'app_test_key',
        complete: function () {
            console.log("app scene loaded");
            init(config);
        }
    });
}
function set_ui() {
    var obj = {
        dimension: false,
        temperature: false,
        humidity: false,
        statistics: false,
        status: false,
        insect: false,
        cerealsReserve: false,
        video: false,
    }
    var gui = new dat.gui.GUI({
        type: 'icon2'
    });
    security.div3d.insertBefore(gui.domElement,security.div3d.lastChild);
    gui.setPosition({top: 150, right: 5});
    var img0 = gui.addImageBoolean(obj, 'dimension');
    // var img1 = gui.addImageBoolean(obj, 'temperature').title('聚焦物体');
    // var img2 = gui.addImageBoolean(obj, 'humidity').title('楼层摊开');
    // var img3 = gui.addImageBoolean(obj, 'statistics').title('左键框选');
    // var img4 = gui.addImageBoolean(obj, 'status').title('反调摄像头');
    var img5 = gui.addImageBoolean(obj, 'insect').title('盲区总览');
    // var img6 = gui.addImageBoolean(obj, 'cerealsReserve').title('隐藏视锥');
    var img7 = gui.addImageBoolean(obj, 'video').title('打开视屏墙');
    
    img0.imgUrl('http://47.93.162.148:8081/liangyw/images/security/2D.png');
    // img1.imgUrl('http://47.93.162.148:8081/liangyw/images/security/jujiao.png');
    // img2.imgUrl('http://47.93.162.148:8081/liangyw/images/security/louceng.png');
    // img3.imgUrl('http://47.93.162.148:8081/liangyw/images/security/kuangxuan.png');
    // img4.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shexiangtou.png');
    img5.imgUrl('http://47.93.162.148:8081/liangyw/images/security/mangqu.png');
    // img6.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shizhui.png');
    img7.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shipinqiang.png');
    
    // img1.hover('http://47.93.162.148:8081/liangyw/images/security/jujiao2.png');
    // img2.hover('http://47.93.162.148:8081/liangyw/images/security/louceng2.png');
    // img3.hover('http://47.93.162.148:8081/liangyw/images/security/kuangxuan2.png');
    // img4.hover('http://47.93.162.148:8081/liangyw/images/security/shexiangtou2.png');
    img5.hover('http://47.93.162.148:8081/liangyw/images/security/mangqu2.png');
    // img6.hover('http://47.93.162.148:8081/liangyw/images/security/shizhui2.png');
    img7.hover('http://47.93.162.148:8081/liangyw/images/security/shipinqiang2.png');
    
    img0.onChange(function( bool ){
        if ( bool ) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/3D.png');
            change_3d(false);
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/2D.png');
            change_3d(true);
        }
    });
    // img1.onChange(function(a){
    //     if (a) {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/jujiao2.png');
    //     } else {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/jujiao.png');
    //     }
    // });
    // img2.onChange(function(a){
    //     if (a) {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/louceng2.png');
    //     } else {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/louceng.png');
    //     }
    // });
    // img3.onChange(function(a){
    //     if (a) {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/kuangxuan2.png');
    //         document.addEventListener("mousedown", mouse_region, false);
    //     } else {
    //         /* 判断是否是2d状态 如果是禁止左键旋转 */
    //         console.log(img0);
    //         if(img0.__url == 'http://47.93.162.148:8081/liangyw/images/security/3D.png'){
    //             console.log("0000000");
    //             app.camera.orbit.enableRotate = false;
    //         }else{
    //             app.camera.orbit.enableRotate = true;
    //         }
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/kuangxuan.png');
    //         // app.camera.orbit.enableRotate=true;
    //         document.removeEventListener("mousedown", mouse_region, false);
    //         for (var i = 0; i < camSign.length; i++) {
    //             camSign[i].style.background = '';
    //         }
    //
    //     }
    // });
    // img4.onChange(function(a){
    //     if (a) {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shexiangtou2.png');
    //     } else {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shexiangtou.png');
    //     }
    // });
    img5.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/mangqu2.png');
            security.versions.forEach(function (t) { t.visible = true })
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/mangqu.png');
            security.versions.forEach(function (t) { t.visible = false })
        }
    });
    // img6.onChange(function(a){
    //     if (a) {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shizhui2.png');
    //     } else {
    //         this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shizhui.png');
    //     }
    // });
    img7.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shipinqiang2.png');
            // 打开视频墙
            security.div3d.style.position = 'absolute';
            security.div3d.style.width = window.innerWidth * 3 / 5 + 'px';
            createDiv();
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shipinqiang.png');
            // 关闭视频墙
            security.div3d.style.position = 'absolute';
            security.div3d.style.width = window.innerWidth+ 'px';
            removeDiv();
        }
    });
}
var cs = [];
var can_create_cam = true;
//创建div
function createDiv(){
    if (cameraIframeUI != null) {
        cameraIframeUI.destroy();
    }
    can_create_cam=false;
    //首先创建div
    var div_right = document.createElement('divRight');
    document.body.appendChild(div_right);
    //给div设置样式，比如大小、位置
    var cssStr = "z-index:0;width:"+window.innerWidth*2/5+"px;height:"+window.innerHeight+
        "px;background-color:#807F77;border:1px solid black;position:absolute;right:0px;top:0px;";
    //将样式添加到div上，显示div
    div_right.style.cssText = cssStr;
    div_right.id = 'divRight';
    div_right.style.display = 'block';
    var rect_x = window.innerWidth * 2 / 5 / 3;
    var rect_y = window.innerHeight / 3;
    if(cs.length == 0){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                var uic;
                var ui2data = {
                    iframe: true
                };
                uic = new dat.gui.GUI({
                    type:'signboard2',
                    name:'Video'+(3*j+i+1).toString(),
                    width:rect_x+"px"
                });
                //显示title
                uic.remember(ui2data);
                uic.domElement.style.zIndex = 100;
                uic.domElement.style.width = rect_x + 'px';
                uic.domElement.style.height = rect_y + 'px';
                // 设置url
                uic.addIframe(ui2data, 'iframe').name("　").iframeUrl("http://liveshare.huya.com/iframe/lafeng").setHeight('300px');
                // ui位置默认在 右上角
                uic.setPosition({right:rect_x * (2-i), top: rect_y * j});
                cs.push(uic);
            }
        }
    }
}
//移除创建的div
function removeDiv(){
    document.body.removeChild(document.getElementById("divRight"));
    if(cs.length > 0){
        cs.forEach(function (t) {
            if (t != null) {t.destroy();
        } })
    }
    cs=[];
    can_create_cam=true;
}

/* 视频 */
var cameraIframeUI = null;
var objs;
function create_camera(right, top) {
    camSign.forEach(function (t) {t.addEventListener("click",function () {if(can_create_cam) {
            if (cameraIframeUI != null) {
                cameraIframeUI.destroy();
            }
            var ui2data = {
                iframe: true
            };
            cameraIframeUI = new dat.gui.GUI({
                t3d: app,
                type: 'signboard2',
                name: t.children[0].children[1].innerHTML,
                isClose: true,
                width: "450px"
            });
            //显示title
            cameraIframeUI.remember(ui2data);
            // 设置url
            cameraIframeUI.addIframe(ui2data, 'iframe').name("　").iframeUrl("http://liveshare.huya.com/iframe/lafeng").setHeight('300px');
            // ui位置默认在 右上角
            cameraIframeUI.setPosition({right: right, top: top});
            cameraIframeUI.setZIndex(10);
            cameraIframeUI.bind('close', function () {
                if (cameraIframeUI != null) {
                    cameraIframeUI.destroy()
                }
            })
        }})});
}

var camSign;
function mouse_region(ev) {
    app.camera.orbit.enableRotate=false;
    ev = event || window.event;
    var box = document.querySelector('.box');
    
    var disx = ev.clientX; //鼠标起始点坐标
    var disy = ev.clientY;
    document.onmousemove = function(ev){
        // console.log(ev.which);
        if(ev.which===1){
            box.style.display = 'block';
            //右下拖
            if (ev.clientX > disx && ev.clientY > disy) {  //目前按下的坐标X与Y都大于 开始的坐标
                // console.log('右下拖')
                box.style.left = disx + 'px';
                box.style.top = disy + 'px';
                box.style.width = ev.clientX - disx + 'px';
                box.style.height = ev.clientY - disy + 'px';
            }
    
            //右上拖
            if (ev.clientX > disx && ev.clientY < disy) {
                // console.log('右上拖')
                box.style.left = disx + 'px';
                box.style.top = ev.clientY + 'px';
                box.style.width = ev.clientX - disx + 'px';
                box.style.height = disy- ev.clientY + 'px';
            }
    
            //右下拖
            if (ev.clientX < disx && ev.clientY > disy) {
                // console.log('右上拖')
                box.style.left = ev.clientX + 'px';
                box.style.top = disy + 'px';
                box.style.width = disx-ev.clientX + 'px';
                box.style.height = ev.clientY-disy + 'px';
            }
    
            //左上
            if (ev.clientX < disx && ev.clientY < disy) {
                // console.log('右上拖')
                box.style.left = ev.clientX + 'px';
                box.style.top = ev.clientY + 'px';
                box.style.width = disx-ev.clientX + 'px';
                box.style.height = disy- ev.clientY + 'px';
            }
            document.onmouseup = function(ev){
                document.onmousemove = null;
                box.style.display = 'none';
            }
        }
        var cams = [];
        // 框选元素
        for (var i = 0; i < camSign.length; i++) {
            if(getPos(box).right < getPos(camSign[i]).left || getPos(box).top > getPos(camSign[i]).bottom || getPos(box).bottom < getPos(camSign[i]).top || getPos(box).left > getPos(camSign[i]).right){
                camSign[i].style.background = ''
            }
            else{
                cams.push(camSign[i]);
                // console.log(cams.length);
                // camSign[i].style.background = 'blue';
                // console.log(cams[0]);
                cams.forEach(function (t) { t.style.background = '' });
                cams[0].style.background = 'blue';
                
                // console.log(cams[0].children[0].children[1].innerHTML);
                if (cameraIframeUI != null) {
                    cameraIframeUI.destroy();
                }
                var ui2data = {
                    iframe: true
                };
                cameraIframeUI = new dat.gui.GUI({
                    type:'signboard2',
                    name:cams[0].children[0].children[1].innerHTML,
                    isClose: true,
                    isDrag: true,
                    width:"450px"
                });
                //显示title
                cameraIframeUI.remember(ui2data);
                // 设置url
                cameraIframeUI.addIframe(ui2data, 'iframe').name("　").iframeUrl("http://shuidi.huajiao.com/pc/player_autosize.html?sn=36061726627&channel=hide").setHeight('300px');
                // ui位置默认在 右上角
                cameraIframeUI.setPosition({left:app.domElement.offsetWidth - cameraIframeUI.domElement.offsetWidth -250, top: 100});
            }
        }
        return false;
    }
    
    //封装获取盒模型详细信息
    function getPos(obj){
        return obj.getBoundingClientRect();
    }
}
function hide_other() {
    app.outdoors.visible = false;
    var f = app.buildings[0].floors;
    for(var i=0;i<f.length;i++){
        f[i].visible = false;
    }
    f[1].visible = true;
    f[1].roofNode.visible=false;
}
/* 创建 Panel */
var thing;
function create_panels(things, markID) {
    var panelEle = document.getElementById( markID );
    things.forEach(function (obj) {
        if(obj==things[0]){
            thing=obj;
            addui_for_objs(obj,panelEle);
        }else{
            var panel = panelEle.cloneNode(true);
            panel.style.zIndex = 10;
            document.getElementById('div3d').insertBefore(panel, panelEle);
            addui_for_objs(obj,panel);
        }
        add_versions(obj.position,[0.5,0.5,-20],subName(obj.id));
    })
}
function addui_for_objs(obj, ele) {
    ele.style.display='block';
    ele.children[0].children[1].innerHTML="名称：Video"+subName(obj.id);
    var box = new THREE.Box3().setFromObject(obj.node);
    obj.addUI(ele, [0, box.getSize().y, 0 ],[0.2,1]);
    app.camera.worldToScreen(obj.position);
}
function subName( modelName ) {
    var index = modelName.indexOf('D');
    modelName = modelName.substr(index+1);
    modelName -= 3;
    return modelName;
}
function add_versions(position,rotation,index) {
    // 创建立方体
    var p;
    var geometry = new THREE.CylinderGeometry( 0, 2, 6, 4 );
    var meshMaterial = new THREE.MeshBasicMaterial({ color: 0x87cefa,transparent:true,opacity:0.4 });
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    wireFrameMat.wireframe = true;
    var mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry, [meshMaterial, wireFrameMat]);
    // 改变旋转中心点
    var wrapper = new THREE.Object3D();
    wrapper.position.set(0,2.5,0);
    wrapper.add(mesh);
    mesh.position.set(-0,-2.5,-0);
    p = wrapper;
    // 设置pos rot
    p.name="version"+index;
    p.position.set(position[0],position[1],position[2]);
    p.rotation.set(rotation[0],rotation[1],rotation[2]);
    security.versions.push(p);
}
function _clamp ( v, minv, maxv ) {
    return ( v < minv ) ? minv : ( ( v > maxv ) ? maxv : v );
}
function change_3d ( bool ) {
    // 防止旋转时候中断的bug
    app.camera.orbit.enabled = true;
    // 获取场景的大小
    var box = new THREE.Box3().setFromObject(app.debug.scene);
    var offsetFactor = [0,1,0];
    var radius = box.getSize().length();//lenght 返回的是对角线长
    var center = box.getCenter();
    var eyePos = [];
    radius = _clamp(radius,4,1000);
    if (!bool) {
        eyePos = [center.x + radius * offsetFactor[0], center.y + radius * offsetFactor[1], center.z + radius * offsetFactor[2] ];
        eyePos.y = _clamp(eyePos.y, 10, 1000);
        app.camera.orbit.enableRotate = false;//2d 时候关闭旋转
    } else {
        offsetFactor = [0.5,0.5,0.5];
        eyePos = [center.x + radius * offsetFactor[0], center.y + radius * offsetFactor[1], center.z + radius * offsetFactor[2] ];
        app.camera.orbit.enableRotate = true;
    }
    app.camera.flyTo({
        position: eyePos,
        target: [center.x,center.y,center.z],
        time: 800 // 耗时毫秒
    });
}