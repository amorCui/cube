(function(window){
    let cube =function(selector){
        let dom = document.querySelector(selector);
        let opts = {
            type:'standard',
            color:'#000',
            backGroundColor:'#fff',
            isRadius:true,
            radiusSize:2,//仅在isRadius为true的时候生效
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
            options.backGroundColor = options.backGroundColor || opts.backGroundColor;
            options.isRadius = options.isRadius === undefined ?opts.isRadius:options.isRadius;
            options.radiusSize = isNaN(Number(options.radiusSize))? opts.radiusSize: Number(options.radiusSize);
            //初始化状态
            dom.classList.add('cube');
            return options;
        }

        let mk = function(type,color,bkcolor,isRadius,radiusSize){
            let cubeLine;
            type = typeMap.includes(type)?type:opts.type;
            color = color || opts.color;
            bkcolor = bkcolor || opts.backGroundColor;
            isRadius = isRadius === undefined ?opts.isRadius:isRadius;
            radiusSize = isNaN(Number(opts.radiusSize))? opts.radiusSize: Number(opts.radiusSize);
            //判断内部是否存在.cubeLine元素
            if(!dom.querySelector('.cube__cubeLine')){
                cubeLine = document.createElement('div');
                cubeLine.classList.add('cube__cubeLine','cube__cubeLine_' + type);
                dom.append(cubeLine);
            }else{
                cubeLine = dom.querySelector('.cube__cubeLine');
                cubeLine.classList = ['cube__cubeLine'];
                cubeLine.classList.add('cube__cubeLine_' + type);
            }
           
            mkColor(bkcolor,color,isRadius,radiusSize);
        }

        let mkColor = function(bkcolor,color,isRadius,radiusSize){
            //判断是否含有 title为cube的style，没有的话添加
            let hasStyle = false;
            for(let sheet of document.styleSheets){
                if(sheet.title === 'cubestyle'){
                    hasStyle = true;
                }
            }
            let sheet;
            if(!hasStyle){
                let style = document.createElement("style");
                style.type = "text/css";
                style.title = 'cubestyle';
                
                let head = document.getElementsByTagName('head')[0];
                head.appendChild(style);
                sheet = document.styleSheets[document.styleSheets.length - 1];
                insertRule(sheet,'.cube','background-color:' + bkcolor + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube__cubeLine','color:' + color + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube__cubeLine:before','color:' + color + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube__cubeLine:after','color:' + color + ';',sheet.cssRules.length);
                if(isRadius){
                    insertRule(sheet,'.cube__cubeLine','border-radius:' + radiusSize + 'px;',sheet.cssRules.length);
                    insertRule(sheet,'.cube__cubeLine:before','border-radius:' + radiusSize + 'px;',sheet.cssRules.length);
                    insertRule(sheet,'.cube__cubeLine:after','border-radius:' + radiusSize + 'px;',sheet.cssRules.length);
                }
            }else{
                let sheet ;
                Object.getOwnPropertyNames(document.styleSheets).forEach(function(val){
                    if(document.styleSheets[val].title == 'cubestyle'){
                        sheet = document.styleSheets[val];
                    }
                });

                insertRule(sheet,'.cube','background-color:' + bkcolor + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube__cubeLine','color:' + color + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube__cubeLine:before','color:' + color + ';',sheet.cssRules.length);
                insertRule(sheet,'.cube__cubeLine:after','color:' + color + ';',sheet.cssRules.length); 
            }
        }

        let insertRule = function(sheet,ruleKey,ruleValue,index){
    　　    return sheet.insertRule ? sheet.insertRule(ruleKey+ '{' + ruleValue + '}',index) : sheet.addRule(ruleKey,ruleValue,index);
    　　} 


        return{
            obj:dom,
            options:{},
            init:function(options){
                //初始化
                this.options = init(options);
                mk(options.type,options.color,options.backGroundColor,options.isRadius,options.radiusSize);
                return this;
            },
            transByType:function(type){
                console.log(this);
                //变换到一种状态
                mk(type,this.options.color,this.options.backGroundColor,this.options.isRadius,this.options.radiusSize);
                return this;
            },
            changeColor:function(bkcolor,color){
                this.options.color = color;
                this.options.backGroundColor = bkcolor;
                mkColor(bkcolor,color);
                return this;
            }
        }
    }
    window.cube = cube;

})(window)