var app;
var config = {
}
function init(c){
    app.background=new THREE.Color( 0xD3D3D3 );
    HideOther();
    CameraFly();
    CreatePanels(app.query('/buildings[1]/floors[2]/things').query('[物体类型=摄像头]'),"hello",'markPanel','block');
    camSign = document.querySelectorAll('.signCam');
    test();
    UI();
}
window.onload = function () {
    app = new t3d.App({
        el: "div3d",
        url: "https://speech.uinnova.com/static/models/security2",
        ak:'app_test_key',
        complete: function () {
            console.log("app scene loaded");
            init(config);
        }
    });
}
function UI() {
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
    gui.setPosition({top: 100, right: 10});
    var img0 = gui.addImageBoolean(obj, 'dimension');
    var img1 = gui.addImageBoolean(obj, 'temperature').title('聚焦物体');
    var img2 = gui.addImageBoolean(obj, 'humidity').title('楼层摊开');
    var img3 = gui.addImageBoolean(obj, 'statistics').title('左键框选');
    var img4 = gui.addImageBoolean(obj, 'status').title('反调摄像头');
    var img5 = gui.addImageBoolean(obj, 'insect').title('盲区总览');
    var img6 = gui.addImageBoolean(obj, 'cerealsReserve').title('隐藏视锥');
    var img7 = gui.addImageBoolean(obj, 'video').title('打开视屏墙');
    
    img0.imgUrl('http://47.93.162.148:8081/liangyw/images/security/2D.png');
    img1.imgUrl('http://47.93.162.148:8081/liangyw/images/security/jujiao.png');
    img2.imgUrl('http://47.93.162.148:8081/liangyw/images/security/louceng.png');
    img3.imgUrl('http://47.93.162.148:8081/liangyw/images/security/kuangxuan.png');
    img4.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shexiangtou.png');
    img5.imgUrl('http://47.93.162.148:8081/liangyw/images/security/mangqu.png');
    img6.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shizhui.png');
    img7.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shipinqiang.png');
    
    img1.hover('http://47.93.162.148:8081/liangyw/images/security/jujiao2.png');
    img2.hover('http://47.93.162.148:8081/liangyw/images/security/louceng2.png');
    img3.hover('http://47.93.162.148:8081/liangyw/images/security/kuangxuan2.png');
    img4.hover('http://47.93.162.148:8081/liangyw/images/security/shexiangtou2.png');
    img5.hover('http://47.93.162.148:8081/liangyw/images/security/mangqu2.png');
    img6.hover('http://47.93.162.148:8081/liangyw/images/security/shizhui2.png');
    img7.hover('http://47.93.162.148:8081/liangyw/images/security/shipinqiang2.png');
    
    img0.onChange(function(a){
        console.log(a);
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/3D.png');
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/2D.png');
        }
    });
    img1.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/jujiao2.png');
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/jujiao.png');
        }
    });
    img2.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/louceng2.png');
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/louceng.png');
        }
    });
    img3.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/kuangxuan2.png');
            enbleKX();
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/kuangxuan.png');
            cancelKX();
        }
    });
    img4.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shexiangtou2.png');
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shexiangtou.png');
        }
    });
    img5.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/mangqu2.png');
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/mangqu.png');
        }
    });
    img6.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shizhui2.png');
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shizhui.png');
        }
    });
    img7.onChange(function(a){
        if (a) {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shipinqiang2.png');
        } else {
            this.imgUrl('http://47.93.162.148:8081/liangyw/images/security/shipinqiang.png');
        }
    });
}

/* 视频 */
var cameraIframeUI = null;
var objs;
function test() {
    camSign.forEach(function (t) { console.log("111222111");t.addEventListener("click",function () {
        console.log("111111");
        if (cameraIframeUI != null) {
            cameraIframeUI.destroy();
        }
        var ui2data = {
            iframe: true
        };
        cameraIframeUI = new dat.gui.GUI({
            type:'signboard2',
            name:t.children[0].children[1].innerHTML,
            isClose: true,
            isDrag: true,
            width:"450px"
        });
        //显示title
        cameraIframeUI.remember(ui2data);
        // 设置url
        cameraIframeUI.addIframe(ui2data, 'iframe').name("　").iframeUrl("http://shuidi.huajiao.com/pc/player_autosize.html?sn=36061726627&channel=hide").setHeight('300px');
        // ui位置默认在 右上角
        cameraIframeUI.setPosition({left:app.domElement.offsetWidth - cameraIframeUI.domElement.offsetWidth - 100, top: 100});
    }) });
}

var camSign;
function MouseRegion(ev) {
    ev = event || window.event;
    var box = document.querySelector('.box');
    
    var disx = ev.clientX; //鼠标起始点坐标
    var disy = ev.clientY;
    document.onmousemove = function(ev){
        console.log(ev.which);
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
                console.log(cams.length);
                // cams[0].style.background = 'red';
            }
        }
        
        return false;
    }
    
    //封装获取盒模型详细信息
    function getPos(obj){
        return obj.getBoundingClientRect();
    }
}

function enbleKX() {
    app.camera.orbit.enableRotate=false;
    document.addEventListener("mousedown", MouseRegion, false);
}
function cancelKX() {
    app.camera.orbit.enableRotate=true;
    document.removeEventListener("mousedown", MouseRegion, false);
    for (var i = 0; i < camSign.length; i++) {
        camSign[i].style.background = '';
    }
}
function CameraFly() {
    var bPOS=app.buildings[0].floors[1].position;
    app.camera.flyTo({
        position: [bPOS[0]+80, bPOS[1]+80, bPOS[2]-80],
        target: [bPOS[0],bPOS[1], bPOS[2]],
        time: 1000
    });
}
function HideOther() {
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
function CreatePanels( things, markID) {
    var panelEle = document.getElementById( markID );
    things.forEach(function (obj) {
        if(obj==things[0]){
            thing=obj;
            AddUIForObj(obj,panelEle);
        }else{
            var panel = panelEle.cloneNode(true);
            document.body.insertBefore(panel, panelEle);
            AddUIForObj(obj,panel);
        }
        AddVision(obj.position,[0,0,-20],subName(obj.id));
    })
}
function AddUIForObj(obj, ele) {
    ele.style.display='block';
    ele.children[0].children[1].innerHTML="名称：Video"+subName(obj.id);
    var box = new THREE.Box3().setFromObject(obj.node);
    obj.addUI(ele, [0, box.getSize().y, 0 ],[0.2,1]);
    app.camera.worldToScreen(obj.position);
}
function subName( modelName ) {
    var index = modelName.indexOf('D');
    modelName = modelName.substr(index+1);
    return modelName;
}
function AddVision(position,rotation,index) {
    // 创建立方体
    var p = new THREE.Group();
    var geometry = new THREE.CylinderGeometry( 0, 2, 6, 4 );
    var polyhedron = createMesh(geometry);
    p = changePivot(0,2.5,0,polyhedron);
    p.name="vision"+index;
    p.position.set(position[0],position[1],position[2]);
    p.rotation.set(rotation[0],rotation[1],rotation[2]);
    app._real.scene.add(p);
}
function createMesh(geom) {
    var meshMaterial = new THREE.MeshBasicMaterial({ color: 0x87cefa,transparent:true,opacity:0.4 });
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    wireFrameMat.wireframe = true;
    var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
    return mesh;
}
function changePivot(x,y,z,obj){
    var wrapper = new THREE.Object3D();
    wrapper.position.set(x,y,z);
    wrapper.add(obj);
    obj.position.set(-x,-y,-z);
    return wrapper;
}