!function($){var CCI=CCI||{};CCI.Templates=CCI.Templates||{},CCI.Templates.filterRangeContent=function(t){var e='<div id="'+t.dropdown_id+'" class="sa-filter-form  dropdown-menu"><form onsubmit="return false">';return e+='<div class="form-body"><div class="field-group aui-field-workratio">',e+='<input name="'+t.name+'" type="hidden" value="">',e+='<div class="'+t.name+'-min"><label for="searcher-'+t.name+'-min">'+(t.title_min?t.title_min:"Min")+"</label>",e+='<input class="text" id="searcher-'+t.name+'-min" type="number" min="'+t.min+'" max="'+t.max+'">',e+="</div>",e+='<div class="'+t.name+'-max"><label for="searcher-'+t.name+'-max">'+(t.title_max?t.title_max:"Max")+"</label>",e+='<input class="text" id="searcher-'+t.name+'-max" type="number" min="'+t.min+'" max="'+t.max+'">',e+="</div>",e+="</div></div></form></div>"};var Button=function(t){this.options=t,this.init(),this.refresh()};Button.prototype={init:function(){this.container=$(this.templateContainer({id:this.options.id,is_subtle:this.options.btn_subtle,class:this.options.class||"btn-default"}))},refresh:function(){this.container.html(this.templateContent({title:this.options.title,label:this.options.label,labelAlways:this.options.labelAlways,labelAll:this.options.labelAll,labelValue:this.options.labelValue}))},setValue:function(t,e){this.options.labelValue=t,this.options.title=e,this.refresh()},render:function(){return this.container},templateContainer:function(t){return'<button type="button" data-toggle="dropdown" aria-controls="'+t.id+'" class="btn btn-xs '+t.class+(t.is_subtle?" aui-button-subtle":"")+'" />'},templateContent:function(t){var e="",i="",n=t.labelValue&&""!==t.labelValue;return t.title&&""!==t.title&&(i=' title="'+t.title+'"'),e+='<div class="criteria-wrap"'+i+">",n&&!t.labelAlways||(e+='<span class="fieldLabel">'+t.label+":</span> "),e+=n?t.labelValue:t.labelAll,e+=' <span class="caret"></span>',e+="</div>"}};var Trigger=function(){};Trigger.prototype={_initTrigger:function(){this.triggers||(this.triggers={})},_setTrigger:function(t,e){this.triggers[t]||(this.triggers[t]=[]),this.triggers[t].push(e)},on:function(t,e){var i=this;i._initTrigger(),"object"==typeof t?$.each(t,function(t,e){i._setTrigger(t,e)}):i._setTrigger(t,e)},trigger:function(t){this._initTrigger();var e=this.triggers[t];if(e)for(var i in e)e.hasOwnProperty(i)&&e[i]()}};var Util={};Util.clone=function(t){var e;if(null==t||"object"!=typeof t)return t;if(t instanceof Date)return(e=new Date).setTime(t.getTime()),e;if(t instanceof Array){e=[];for(var i=0,n=t.length;i<n;i++)e[i]=Util.clone(t[i]);return e}if(t instanceof Object){e={};for(var o in t)t.hasOwnProperty(o)&&(e[o]=Util.clone(t[o]));return e}throw new Error("Unable to copy obj! Its type isn't supported.")},Util.arraysEqual=function(t,e){if(t===e)return!0;if(null==t||null==e)return!1;if(t.length!=e.length)return!1;for(var i=0;i<t.length;++i)if(t[i]!==e[i])return!1;return!0};var DropdownController=function(t){this.props={id:t.id,submitText:t.submitText},this.blocks=[],this._init()};DropdownController.prototype=Object.create(Trigger.prototype),DropdownController.prototype.constructor=DropdownController,DropdownController.prototype._init=function(){var t=this;t.component=$(t._templateContainer()),t.container=t.component.find("form"),t.initValue="",t.component.on("click",".submit-footer",function(e){t.trigger("submit")})},DropdownController.prototype._setInitValue=function(t){var e=Util.clone(t.getValue());e&&(e instanceof Array&&e!==[]||"string"==typeof e&&""!==e)&&(this.initValue=e,t.validValue(e)&&(this.value=e,this.valueLabel=t.getValueLabel(),this.valueTitle=t.getValueTitle(),this.trigger("change")))},DropdownController.prototype.addComponent=function(t){var e=this,i="_"+Math.round(Math.random()%10*Math.pow(10,10));this._setInitValue(t),this.blocks.push(i),this.blocks[i]=t,t.on("change",function(){e._setComponentValue(i)}),this.container.append(t.render())},DropdownController.prototype._setComponentValue=function(t){var e=this.blocks[t],i=e.getValue()||"";if(""!==i)for(var n=0,o=this.blocks.length;n<o;n++){var a=this.blocks[n];a!==t&&this.blocks[a].setValue(null)}else e.setEmptyValue();console.log("_setComponentValue",i),this.value=i,this.valueLabel=e.getValueLabel(),this.valueTitle=e.getValueTitle(),this._showSubmit(!Util.arraysEqual(this.getInitValue(),i)),this.trigger("change")},DropdownController.prototype.resetToInitValue=function(){for(var t=0,e=this.blocks.length;t<e;t++){var i=this.blocks[t],n=this.blocks[i];n.validValue(this.initValue)&&(n.setValue(this.initValue),this._setComponentValue(i))}},DropdownController.prototype.getInitValue=function(){return this.initValue},DropdownController.prototype.getValue=function(){return this.value},DropdownController.prototype.getValueLabel=function(){return this.valueLabel},DropdownController.prototype.getValueTitle=function(){return this.valueTitle},DropdownController.prototype.render=function(){return this.component},DropdownController.prototype._showSubmit=function(t){this.component.find(".submit-footer").toggle(t)},DropdownController.prototype._templateContainer=function(){var t="";return t+='<div id="'+this.props.id+'" class="sa-filter-form  dropdown-menu">',t+='<form onsubmit="return false"></form>',t+=this._templateSubmit(),t+="</div>"},DropdownController.prototype._templateSubmit=function(){var t="";return this.props.submitText&&(t='<div class="submit-footer" style="display: none">'+this.props.submitText+"</div>"),t};var Block=function(){};Block.prototype=Object.create(Trigger.prototype),Block.prototype.constructor=Block,Block.prototype.validValue=function(t){return!1},Block.prototype.setValue=function(t){},Block.prototype.setEmptyValue=function(){},Block.prototype.getValue=function(){return null},Block.prototype.getValueLabel=function(){return null},Block.prototype.getValueTitle=function(){return null},Block.prototype.render=function(){return null};var DateRangeBlock=function(t){this.name=t.name,this.value=t.value||"",this.title={min:t.title.min,max:t.title.max},this.error_date=t.error_date,this._init()};DateRangeBlock.prototype=Object.create(Block.prototype),DateRangeBlock.prototype.constructor=DateRangeBlock,DateRangeBlock.prototype._init=function(){var t=this;t.component=$(t._template());var e=this.value;if(this.input=this.component.find('input[name="'+this.name+'"]'),e.indexOf(",")>-1){var i=e.substr(0,e.indexOf(",")),n=e.substr(e.indexOf(",")+1);this.component.find("#date-"+this.name+"-min").val(i),this.component.find("#date-"+this.name+"-max").val(n),this.input.val(this.value)}$(t.component).find(".date-picker").datepicker({format:"dd.mm.yyyy",weekStart:1,autoclose:!0,language:str_lang}),$(t.component).on("change",".date-picker",function(){t.handleChange(this)})},DateRangeBlock.prototype.handleChange=function(t){var e=$(t),i=e.attr("id")==="date-"+this.name+"-min"?"min":"max",n=this.value,o="",a="",s="",r="",l="",c="";console.log("oldFullValue",n),this.validValue(n)&&(a=o=n.substr(0,n.indexOf(",")),r=s=n.substr(n.indexOf(",")+1)),"min"===i?a=e.val():r=e.val(),a&&(l=a.substr(6,2)+a.substr(3,2)+a.substr(0,2)),r&&(c=r.substr(6,2)+r.substr(3,2)+r.substr(0,2)),a&&r&&l>c&&this.error_date?(setTimeout(function(){e.val("min"===i?o:s)},0),alert(this.error_date)):(this.setValue(a+(a||r?",":"")+r),this.trigger("change"))},DateRangeBlock.prototype.validValue=function(t){return t.indexOf(",")>-1||""===t},DateRangeBlock.prototype.setValue=function(t){this.value=t||"",null===t&&this.component.find(".date-picker").val(null),this.input.prop("disabled",null===t),this.validValue(this.value)&&this.input.val(this.value)},DateRangeBlock.prototype.setEmptyValue=function(){this.input.prop("disabled",!1),this.input.val("null")},DateRangeBlock.prototype.getValue=function(){return this.value},DateRangeBlock.prototype.getValueLabel=function(){var t=this.value;if(this.validValue(t)){var e=t.substr(0,t.indexOf(",")),i=t.substr(t.indexOf(",")+1);t=""==e&&""==i?null:""==e?"< "+i:""==i?"> "+e:e+" - "+i}return t},DateRangeBlock.prototype.getValueTitle=function(){return null},DateRangeBlock.prototype.render=function(){return this.component},DateRangeBlock.prototype.renderInput=function(){return this.input},DateRangeBlock.prototype._template=function(){var t="";return t+='<div class="form-body"><div class="field-group aui-field-workratio">',t+='<input name="'+this.name+'" type="hidden" disabled>',t+='<div class="'+this.name+'-min"><label for="date-'+this.name+'-min">'+(this.title.min?this.title.min:"Min")+"</label>",t+='<input class="text date-picker" id="date-'+this.name+'-min">',t+="</div>",t+='<div class="'+this.name+'-max"><label for="date-'+this.name+'-max">'+(this.title.max?this.title.max:"Max")+"</label>",t+='<input class="text date-picker" id="date-'+this.name+'-max">',t+="</div>",t+="</div></div>"};var ListBlock=function(){};ListBlock.prototype=Object.create(Block.prototype),ListBlock.prototype.constructor=ListBlock,ListBlock.prototype.icon_search="icon-search4",ListBlock.prototype.icon_clear="icon-cancel-circle2",ListBlock.prototype._init=function(){var t=this;t.component=$(t._template()),t.container=t.component.find(".sa-filter-list-scroll"),t.elements=[],$.each(t.initOptions,function(){var e=$(this);t.elements.push({value:e.attr("value"),title:e.attr("title"),label:e.html(),active:e.prop("selected")})}),t.refresh(),$(t.container).on("click",".select-list-item, .check-list-item",function(e){e.preventDefault(),t.handleChange(this)}),$(t.component).on("click",".clear-all",function(e){e.preventDefault(),e.stopPropagation(),t.handleClear()}),$(t.component).on("click",".clear-field",function(){t.handleSearchClear(this)}),$(t.component).on("keyup","#"+t.props.search_id,function(){t.handleSearchChange(this)})},ListBlock.prototype.handleChange=function(t){},ListBlock.prototype.handleClear=function(){this.setEmptyValue(),this.trigger("change"),this.refresh()},ListBlock.prototype.handleSearchClear=function(t){$(t).prev().val(""),$(t).addClass(ListBlock.prototype.icon_search).removeClass("clear-field "+ListBlock.prototype.icon_clear),this.state.hide=this.props.hide||"0",this.refresh()},ListBlock.prototype.handleSearchChange=function(t){var e=this,i=$(t),n=i.val().toLowerCase();if(n.length<0)i.next().addClass(ListBlock.prototype.icon_search).removeClass("clear-field "+ListBlock.prototype.icon_clear),e.state.hide=this.props.hide||"0",e.refresh();else{i.next().removeClass(ListBlock.prototype.icon_search).addClass("clear-field "+ListBlock.prototype.icon_clear);var o,a=[];if(e.props.searchUrl){var s={q:n};e.props.searchUrlCache&&"1"==e.props.searchUrlCache&&(s.cache=Math.random()),$.ajax({url:e.props.searchUrl,dataType:"json",data:s,async:!1,success:function(t){$.each(t.items,function(t,i){o=1===e.elements.filter(function(t){return t.value===i.id&&t.active}).length,a.push({value:i.value,label:i.label,active:o})}),e.state.hide=t.hide||"0"}})}else $.each(e.elements,function(t,e){(e.label.toLowerCase().indexOf(n)>-1||e.value.toLowerCase().indexOf(n)>-1)&&a.push(e)}),e.state.hide=0;e.container.empty(),0===a.length?(e.container.find(".more-criteria-footer").remove(),e.container.html('<li class="no-suggestions">'+e.props.nomatchText+"</li>")):e.refresh(a)}},ListBlock.prototype.getValue=function(){return this.value},ListBlock.prototype.getValueLabel=function(){return $(this.elements).map(function(){if(this.active)return this.label?this.label:this.value}).get().join(", ")},ListBlock.prototype.getValueTitle=function(){return $(this.elements).map(function(){if(this.active)return this.title?this.title:this.label}).get().join("\n")},ListBlock.prototype.refresh=function(t){},ListBlock.prototype.render=function(){return this.component},ListBlock.prototype._template=function(){var t="";return t+=this.has_search?this._templateSearch():"",t+='<div class="sa-filter-list" tabindex="-1"><div id="'+this.props.search_container+'" class="sa-filter-list-scroll" tabindex="-1"></div></div>'},ListBlock.prototype._templateList=function(t){return'<ul class="aui-list-section'+(t?" selected-group":"")+'"></ul>'},ListBlock.prototype._templateListClear=function(){if(this.clearTitle)return'<li class="sa-filter-group-actions"><a href="#" class="clear-all">'+this.clearTitle+"</a></li>"},ListBlock.prototype._templateSearch=function(){return'<div class="sa-filter-search"><input autocomplete="off" aria-autocomplete="list" placeholder="'+this.props.searchTitle+'" class="form-control" id="'+this.props.search_id+'" aria-controls="'+this.props.search_container+'"><span class="icon-default '+ListBlock.prototype.icon_search+' noloading"></span></div>'};var SingleSelectBlock=function(t){this.name=t.name,this.value=t.value||"",this.has_search=t.has_search,this.props={searchTitle:t.searchTitle,search_id:t.search_id||"search",search_container:t.search_container,searchUrl:t.searchUrl,searchUrlCache:t.searchUrlCache,nomatchText:t.nomatchText,exclude:t.exclude,hidden:t.hidden,hide:t.hide,clear:null==t.clear||t.clear},this.state={hide:t.hide},this.clearTitle=t.clearTitle,this.initOptions=t.options,this._init()};SingleSelectBlock.prototype=Object.create(ListBlock.prototype),SingleSelectBlock.prototype.constructor=SingleSelectBlock,SingleSelectBlock.prototype.handleChange=function(t){var e=$(t),i=e.attr("data-value"),n=!0;$.each(this.elements,function(t,e){e.value===i&&(n=!1)}),n&&(this.elements.push({value:i,title:e.attr("title"),label:e.find("label").html(),active:!0}),this.initOptions.parent().append('<option value="'+i+'" title="'+e.attr("title")+'">'+e.find("label").html()+"</option>")),this.setValue(i),this.trigger("change")},SingleSelectBlock.prototype.validValue=function(t){return this.container.find(".select-list-item").filter('[data-value="'+t+'"]').length>0||""===t},SingleSelectBlock.prototype.setValue=function(t){var e=this;if(this.resetOption&&this.resetOption.remove(),this.value=t||"",this.container.find(".select-list-item").filter(".active").removeClass("active"),$.each(this.elements,function(t,i){i.active=i.value===e.value}),null!==t){var i=this.container.find(".select-list-item").filter('[data-value="'+t+'"]');i.length&&i.addClass("active")}else this.refresh();this.validValue(this.value)&&this.initOptions.parent().val(this.value)},SingleSelectBlock.prototype.setEmptyValue=function(){this.setValue(null),this.resetOption||(this.resetOption=this.initOptions.parent().after($('<input type="hidden" name="'+this.name+'" value="null">')))},SingleSelectBlock.prototype.refresh=function(t){var e=this,i=$(this._templateList());if(t)$.each(t,function(t,n){i.append(e._templateListItem(n))});else{var n=!1;$.each(this.elements,function(t,o){o.active&&(n=!0),i.append(e._templateListItem(o))}),n&&e.props.clear&&i.prepend(this._templateListClear())}e.container.empty(),e.container.append(i),this.container.find(".more-criteria-footer").remove(),this.state.hide&&"0"!==this.state.hide&&this.container.append('<div class="more-criteria-footer">...'+this.props.exclude+' <span class="hidden-no">'+this.state.hide+"</span> "+this.props.hidden+"</div>")},SingleSelectBlock.prototype._templateListItem=function(t){return'<li class="select-list-item'+(t.active?" active":"")+'" title="'+(t.title?t.title:"")+'" data-value="'+t.value+'"><label class="item-label">'+t.label+"</label></li>"};var MultiSelectBlock=function(t){this.name=t.name,this.value=t.value||[],this.has_search=t.has_search,this.props={searchTitle:t.searchTitle,search_id:t.search_id||"search",search_container:t.search_container,searchUrl:t.searchUrl,searchUrlCache:t.searchUrlCache,nomatchText:t.nomatchText,exclude:t.exclude,hidden:t.hidden,hide:t.hide,clear:null==t.clear||t.clear},this.state={hide:t.hide},this.clearTitle=t.clearTitle,this.select=t.select,this.initOptions=t.options,this._init()};MultiSelectBlock.prototype=Object.create(ListBlock.prototype),MultiSelectBlock.prototype.constructor=MultiSelectBlock,MultiSelectBlock.prototype.handleChange=function(t){var e=$(t),i=e.find("input").val(),n=!0,o=!e.find("input").is(":checked");if($.each(this.elements,function(t,e){e.value===i&&(n=!1)}),n){var a=e.attr("title")||"",s=e.find("label").text();this.elements.push({value:i,title:a,label:s,active:!0}),console.log(this.select),this.select.append('<option value="'+i+'" title="'+a+'" selected>'+s+"</option>")}var r=this.getValue();1===r.length&&r.indexOf(i)>-1&&!o?this.setEmptyValue():this.setValue(i,o),this.trigger("change")},MultiSelectBlock.prototype.validValue=function(t){return t instanceof Array||this.container.find(".check-list-item").find('input[value="'+t+'"]').length>0||""===t||t===[]},MultiSelectBlock.prototype.setValue=function(t,e){var i=this.value.indexOf(t);this.resetOption&&this.resetOption.remove(),t&&i<0&&e?this.value.push(t):t&&i>-1&&!e?this.value.splice(i,1):null===t&&(this.value=[]),$.each(this.elements,function(i,n){null===t?n.active=!1:n.value===t&&(n.active=e)});var n;null!==t?(n=this.container.find(".check-list-item").find('input[value="'+t+'"]')).length&&n.prop("checked",e):(n=this.container.find(".check-list-item").find("input:checked")).length&&n.prop("checked",!1),console.log("MultiSelectBlock.setValue",t,e),this.validValue(t)&&this.initOptions.filter('[value="'+t+'"]').attr("selected",e)},MultiSelectBlock.prototype.setEmptyValue=function(){console.log("MultiSelectBlock.setEmptyValue"),this.setValue(null),this.initOptions.filter("[selected]").attr("selected",!1),this.resetOption||(this.resetOption=this.select.after($('<input type="hidden" name="'+this.name+'" value="null">')))},MultiSelectBlock.prototype.refresh=function(t){var e,i=this,n=$(this._templateList()),o=$(this._templateList(!0));if(t)$.each(t,function(t,e){e.active?o.append(i._templateListItem(e)):n.append(i._templateListItem(e))});else{var a=!1;$.each(this.elements,function(t,e){e.active?(a=!0,o.append(i._templateListItem(e))):n.append(i._templateListItem(e))}),a&&i.props.clear&&(e=$(this._templateListClear()))}i.container.empty(),e&&i.container.append(e),o.length>0&&i.container.append(o),i.container.append(n),this.container.find(".more-criteria-footer").remove(),this.state.hide&&"0"!==this.state.hide&&this.container.append('<div class="more-criteria-footer">...'+this.props.exclude+' <span class="hidden-no">'+this.state.hide+"</span> "+this.props.hidden+"</div>")},MultiSelectBlock.prototype._templateListItem=function(t){return'<li class="check-list-item"><label class="item-label" title="'+t.title+'"><input type="checkbox" tabindex="-1" value="'+t.value+'" '+(t.active?"checked":"")+">"+t.label+"</label></li>"},CCI.QueryableDropdownSelect=function(t){this._setOptions(t),this.container_id="_"+Math.round(Math.random()%10*Math.pow(10,10)),this._createButton(),this._createDropdownController(),this._assignEvents(),this.render()},CCI.QueryableDropdownSelect.prototype={_setOptions:function(t){this.container=$(t),this.elements=this.container.find("select").find("option"),this.props={name:this.container.find("select").attr("name"),value:this.container.find("select").val(),hide:this.container.find("select").attr("data-hide")||"0",clear_text:this.container.attr("data-clear"),search_str:this.container.attr("data-search"),title:this.container.attr("data-title"),title_always:this.container.attr("data-title-always"),btn_class:this.container.attr("data-btn-class"),nomatch:this.container.attr("data-nomatch"),ALL:this.container.attr("data-ALL"),url:this.container.attr("data-url"),urlCache:this.container.attr("data-urlCache"),exclude:this.container.attr("data-exclude"),hidden:this.container.attr("data-hidden"),btn_subtle:this.container.hasClass("subtle"),submit:this.container.attr("data-submit"),submit_text:this.container.attr("data-submit-text")}},_createButton:function(){this.button=new Button({id:this.container_id+"-dropdown",is_subtle:this.props.btn_subtle,class:this.props.btn_class,label:this.props.title,labelAlways:this.props.title_always,labelAll:this.props.ALL})},_createDropdownController:function(){var instance=this;this.dropdown=new DropdownController({id:this.container_id+"-dropdown",submitText:this.props.submit_text}),this.dropdown.on({change:function(){instance.button.setValue(instance.dropdown.getValueLabel(),instance.dropdown.getValueTitle())},submit:function(){eval(instance.props.submit),$(instance.container).dropdown("toggle")}}),this.blockSingleSelect=new SingleSelectBlock({name:this.props.name,value:this.props.value,has_search:!!this.props.search_str,clearTitle:this.props.clear_text,options:this.elements,searchTitle:!!this.props.search_str&&this.props.search_str+"...",search_id:this.container_id+"-search",search_container:this.container_id+"-suggestion",searchUrl:this.props.url,searchUrlCache:this.props.urlCache,nomatchText:this.props.nomatch,hide:this.props.hide,exclude:this.props.exclude,hidden:this.props.hidden}),this.dropdown.addComponent(this.blockSingleSelect)},_assignEvents:function(){var t=this;$(t.container).on("shown.bs.dropdown",function(){t.blockSingleSelect.refresh()}),$(t.container).on("hidden.bs.dropdown",function(){t.props.submit&&t.dropdown.getInitValue()!==t.dropdown.getValue()&&t.dropdown.resetToInitValue()})},render:function(){this.container.append(this.button.render()),this.container.append(this.dropdown.render())}},$(".sa-filter-select").each(function(){new CCI.QueryableDropdownSelect(this)}),CCI.QueryableDropdownMultiSelect=function(t){this._setOptions(t),this.container_id="_"+Math.round(Math.random()%10*Math.pow(10,10)),this._createButton(),this._createDropdownController(),this._assignEvents(),this.render()},CCI.QueryableDropdownMultiSelect.prototype={_setOptions:function(t){this.container=$(t),this.select=this.container.find("select"),this.elements=this.container.find("select").find("option"),this.props={name:this.container.find("select").attr("name"),value:this.container.find("select").val(),hide:this.container.find("select").attr("data-hide")||"0",clear_text:this.container.attr("data-clear"),search_str:this.container.attr("data-search"),title:this.container.attr("data-title"),title_always:this.container.attr("data-title-always"),btn_class:this.container.attr("data-btn-class"),nomatch:this.container.attr("data-nomatch"),ALL:this.container.attr("data-ALL"),url:this.container.attr("data-url"),urlCache:this.container.attr("data-urlCache"),exclude:this.container.attr("data-exclude"),hidden:this.container.attr("data-hidden"),btn_subtle:this.container.hasClass("subtle"),submit:this.container.attr("data-submit"),submit_text:this.container.attr("data-submit-text")}},_createButton:function(){this.button=new Button({id:this.container_id+"-dropdown",is_subtle:this.props.btn_subtle,class:this.props.btn_class,label:this.props.title,labelAlways:this.props.title_always,labelAll:this.props.ALL})},_createDropdownController:function(){var instance=this;this.dropdown=new DropdownController({id:this.container_id+"-dropdown",submitText:this.props.submit_text}),this.dropdown.on({change:function(){instance.button.setValue(instance.dropdown.getValueLabel(),instance.dropdown.getValueTitle())},submit:function(){eval(instance.props.submit),$(instance.container).dropdown("toggle")}}),this.blockMultiSelect=new MultiSelectBlock({name:this.props.name,value:this.props.value,has_search:!0,clearTitle:this.props.clear_text,select:this.select,options:this.elements,searchTitle:this.props.search_str+"...",search_id:this.container_id+"-search",search_container:this.container_id+"-suggestion",searchUrl:this.props.url,searchUrlCache:this.props.urlCache,nomatchText:this.props.nomatch,hide:this.props.hide,exclude:this.props.exclude,hidden:this.props.hidden}),this.dropdown.addComponent(this.blockMultiSelect)},_assignEvents:function(){var t=this;$(t.container).on("shown.bs.dropdown",function(){t.blockMultiSelect.refresh()}),$(t.container).on("hidden.bs.dropdown",function(){console.log("hidden.bs.dropdown"),t.props.submit&&t.dropdown.getInitValue()!==t.dropdown.getValue()&&t.dropdown.resetToInitValue()})},render:function(){this.container.append(this.button.render()),this.container.append(this.dropdown.render())}},$(".sa-filter-multiselect").each(function(){new CCI.QueryableDropdownMultiSelect(this)}),CCI.QueryableDropdownNumRange=function(t){this._setOptions(t),this.container_id="_"+Math.round(Math.random()%10*Math.pow(10,10)),this._createButton(),this._createDropdownController(),this._assignEvents(),this.render()},CCI.QueryableDropdownNumRange.prototype={_setOptions:function(t){this.options=t},_createButton:function(){this.button=new Button({id:this.container_id+"-dropdown",is_subtle:this.props.btn_subtle,label:this.props.title,labelAlways:this.props.title_always,labelAll:this.props.ALL})},_updateButton:function(t){var e=this.options.value,i=e.substr(0,e.indexOf(",")),n=e.substr(e.indexOf(",")+1);t=""==i&&""==n?null:""==i?this.options.title+": < "+n+this.options.type:""==n?this.options.title+": > "+i+this.options.type:this.options.title+": "+i+this.options.type+" - "+n+this.options.type,this.button.setValue(t),this.dropdown.find('input[name="'+this.options.name+'"]').val(this.options.value)},_createDropdownController:function(){var t={dropdown_id:this.container_id+"-dropdown",name:this.options.name,min:this.options.min,max:this.options.max,title_min:this.options.title_min,title_max:this.options.title_max};this.dropdown=$(CCI.Templates.filterRangeContent(t))},_updateVal:function(){var t=this.options.value,e=t.substr(0,t.indexOf(","))||"",i=t.substr(t.indexOf(",")+1)||"";this.dropdown.find("#searcher-"+this.options.name+"-min").val(e),this.dropdown.find("#searcher-"+this.options.name+"-max").val(i),this.dropdown.find('input[name="'+this.options.name+'"]').val(this.options.value)},_assignEvents:function(){var t=this;$(this.dropdown).on("keyup","input",function(){var e=t.options.value,i=e.substr(0,e.indexOf(",")),n=e.substr(e.indexOf(",")+1),o=$(this);o.attr("id")=="searcher-"+t.options.name+"-min"?i=o.val():n=o.val(),t.options.value=i+","+n,t._updateButton()}),$(t.options.container).on("show.bs.dropdown",function(){t._updateVal()})},render:function(){this.options.container.append(this.button.render()),this.options.container.append(this.dropdown),this._updateButton()}},$(".sa-filter-num").each(function(){var t=$(this),e={container:t,clear_text:t.attr("data-clear"),title:t.attr("data-title"),title_always:t.attr("data-title-always"),ALL:t.attr("data-ALL"),min:t.attr("data-min"),max:t.attr("data-max"),type:t.attr("data-type")||"",name:t.attr("data-name"),value:t.attr("data-value"),title_min:t.attr("data-title-min"),title_max:t.attr("data-title-max"),btn_subtle:t.hasClass("subtle")};new CCI.QueryableDropdownNumRange(e)}),CCI.QueryableDropdownDateRange=function(t){this._setOptions(t),this.container_id="_"+Math.round(Math.random()%10*Math.pow(10,10)),this._createButton(),this._createDropdownController(),this._createBlocks(),this._render(),this._assignEvent()},CCI.QueryableDropdownDateRange.prototype={_setOptions:function(t){this.component=$(t),this.elements=this.component.find("select").find("option"),this.props={clear_text:this.component.attr("data-clear"),title:this.component.attr("data-title"),ALL:this.component.attr("data-ALL"),name:this.component.attr("data-name"),value:this.component.attr("data-value"),btn_class:this.component.attr("data-btn-class"),title_min:this.component.attr("data-min"),title_max:this.component.attr("data-max"),btn_subtle:this.component.hasClass("subtle"),submit:this.component.attr("data-submit"),submit_text:this.component.attr("data-submit-text")}},_createButton:function(){this.button=new Button({id:this.container_id+"-dropdown",is_subtle:this.props.btn_subtle,class:this.props.btn_class,label:this.props.title,labelAlways:!1,labelAll:this.props.ALL})},_createDropdownController:function(){var instance=this;this.dropdown=new DropdownController({id:this.container_id+"-dropdown",submitText:this.props.submit_text}),this.dropdown.on({change:function(){instance.button.setValue(instance.dropdown.getValueLabel(),instance.dropdown.getValueTitle())},submit:function(){$(instance.container).dropdown("toggle"),eval(instance.props.submit)}})},_createBlocks:function(){this.blockDateRange=new DateRangeBlock({name:this.props.name,value:this.props.value,title:{min:this.props.title_min,max:this.props.title_max},error_date:"Дата початку не може бути більше закінчення"}),this.dropdown.addComponent(this.blockDateRange),this.blockSingleSelect=new SingleSelectBlock({name:this.props.name,value:this.props.value,has_search:!1,clearTitle:this.props.clear_text,options:this.elements}),this.dropdown.addComponent(this.blockSingleSelect)},_assignEvent:function(){var t=this;t.component.on("shown.bs.dropdown",function(){t.blockSingleSelect.refresh()}),t.component.on("hidden.bs.dropdown",function(){t.props.submit&&t.dropdown.getInitValue()!==t.dropdown.getValue()&&t.dropdown.resetToInitValue()})},_render:function(){this.component.append(this.button.render()),this.component.append(this.dropdown.render()),this.component.append(this.blockDateRange.renderInput())}},$(".sa-filter-date").each(function(){new CCI.QueryableDropdownDateRange(this)})}(jQuery);