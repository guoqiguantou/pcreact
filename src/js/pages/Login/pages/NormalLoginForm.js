import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,Row,Col } from 'antd';
import styles from "./style/index.scss";
import PropTypes from "prop-types";
import ajaxUtil from "../../../utils/ajaxUtil";

const FormItem = Form.Item;

class NormalLoginForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const{onClick} = this.props;
                if(!values.captcha){
                    onClick(values.username,values.password)
                }else{
                    onClick(values.username,values.password,values.captcha)
                }
                
            }
        });
    };
    state = {
        url : `http://175.6.68.21/Util/Pub/ValiCode/getImg?key=luck`
    }
    changeCaptcha = (e) => {
        e.preventDefault();
        let ntime = new Date().getTime();
        this.setState({
            url : `http://175.6.68.21/Util/Pub/ValiCode/getImg?key=luck#${ntime}`
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {captchisshow} = this.props;
        return (
            <div className={styles.App}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    { captchisshow &&
                        <FormItem>
                            <Row gutter={8}>
                                <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入验证码' }],
                                })(
                                    <Input placeholder="验证码"/>
                                )}
                                </Col>
                                <Col span={12}>
                                    <img style={{height:"40px"}} src={this.state.url} onClick={this.changeCaptcha} />
                                </Col>
                            </Row>
                        </FormItem>
                    }
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            登录
                        </Button>
                        或 <a href="">现在就去注册!</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
NormalLoginForm.propTypes = {
    onClick:PropTypes.func.isRequired
}
const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;