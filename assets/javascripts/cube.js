(function(window){
    let cube =function(selector){
        let dom = document.querySelector(selector);
        let opts = {
            type:'standard',
            color:'#000',
        };
        let typeMap = [
            'standard',
            'vertical',
            'left-arrows',
            'right-arrows',
            'up-arrows',
            'down-arrows',
            'close'
        ];

        let init = function(options){
            let type;
            options = options || {};
            options.type = typeMap.includes(options.type) || opts.type;
            options.color = options.color || opts.color;
            //初始化状态
            dom.classList.add('cube');
            mk(options.type,options.color);
        }

        let mk = function(type,color){
            let cubeLine;
            type = typeMap.includes(type)?type:opts.type;
            color = color || opts.color;
            //判断内部是否存在.cubeLine元素
            if(!dom.querySelector('.cubeLine')){
                cubeLine = document.createElement('div');
                cubeLine.classList.add('cubeLine',type);
                dom.append(cubeLine);
            }else{
                cubeLine = dom.querySelector('.cubeLine');
                cubeLine.classList = ['cubeLine'];
                cubeLine.classList.add(type);
            }
            //判断是否含有 title为cube的style，没有的话添加
            let hasStyle = false;
            for(let sheet of document.styleSheets){
                if(sheet.title === 'cubestyle'){
                    hasStyle = true;
                }
            }
            if(!hasStyle){
                let style = document.createElement("style");
                style.type = "text/css";
                style.title = 'cubestyle';
                
                let head = document.getElementsByTagName('head')[0];
                head.appendChild(style);
                let sheet = document.styleSheets[document.styleSheets.length - 1];
                insertRule(sheet,'.cube .cubeLine','color:' + color + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube .cubeLine:before','color:' + color + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube .cubeLine:after','color:' + color + ';',sheet.cssRules.length);
            }else{

            }

        }

        let insertRule = function(sheet,ruleKey,ruleValue,index){
    　　    return sheet.insertRule ? sheet.insertRule(ruleKey+ '{' + ruleValue + '}',index) : sheet.addRule(ruleKey,ruleValue,index);
    　　} 

        let loadStyleString = function(css){
            let style =document.createElement('style');
            style.type = 'text/css';
        }



        return{
            obj:dom,
            init:function(options){
                //初始化
                init(options);
            },
            transByType:function(type){
                //变换到一种状态
                mk(type);
            }
        }
    }
    window.cube = cube;

})(window)