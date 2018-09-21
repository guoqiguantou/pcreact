import React, { Component,PropTypes } from 'react'
import  '../../../plugin/ueditor/ueditor.config'
import  '../../../plugin/ueditor/ueditor.all'

const propTypes={
    height:PropTypes.string,//高度
    autoHeight:PropTypes.bool,//高度是否自适应内容
    onChange:PropTypes.func,//当内容变化时回调 onChange(editor)
    enableChangeListener:PropTypes.bool//高度是否自适应内容
}
const defaultProps={
    height:"300",
    autoHeight:false,
    enableChangeListener:false
}

/**
 * 富文本编辑器
 */
class HtmlEditor extends Component {

    constructor(props) {
        super(props);
        this.editorID = "ueditor_" + new Date().getTime();
    }

    componentDidMount() {
        this.editor = UE.getEditor(this.refs.ueditorDom.id,{
            autoHeightEnabled: this.props.autoHeight,
            initialFrameWidth:'100%',
            initialFrameHeight:this.props.height,
            catchRemoteImageEnable:false,
            iframeCssUrl:'/plugin/ueditor/themes/iframe.css',
            toolbars: [
                ['FullScreen', 'Source', 'Undo', 'Redo', '|', 'fontsize', '|', 'blockquote', 'horizontal', '|', 'removeformat', 'formatmatch', '|',
                    'imagenone', 'imageleft', 'imageright', 'imagecenter'],
                [
                    'Bold', 'italic', 'underline', 'forecolor', 'backcolor', '|',
                    'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'insertorderedlist', 'insertunorderedlist'
                ],
                [ 'simpleupload', 'insertimage', 'emotion', 'insertvideo']
            ],
            enableAutoSave: false,
        });
        this.editor.ready(() =>{
            this.editor.addListener('contentChange',()=>{
                 if(this.props.onChange && this.enableChangeListener){
                     this.props.onChange(this.editor);
                 }
            });
        });
    }

    /**
     * 设置内容
     */
    setValue(value){
        if(this.editor){
            this.editor.ready(function( editor ) {
                if(value){
                    this.setContent(value);
                }
            });
        }
    }

    /**
     * 获得内容
     */
    getValue(){
        if(this.editor){
            return this.editor.getContent();
        }
    }

    render() {
        return (
            <textarea id={this.editorID} ref="ueditorDom" defaultValue={this.props.children}></textarea>
        );
    }
}

HtmlEditor.propTypes = propTypes;
HtmlEditor.defaultProps = defaultProps;

export default HtmlEditor;