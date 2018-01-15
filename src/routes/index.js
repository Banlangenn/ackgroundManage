/**
 * Created by 叶子 on 2017/8/13.
 */
import {Asyncload} from './asyncComponent.js';
import React, { Component } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import Wysiwyg from 'bundle-loader?lazy!../components/ui/Wysiwyg';  // 按需加载富文本配置

// const Dashboard = Asyncload(()=>import('../components/dashboard/Dashboard'));
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
const BasicForm = Asyncload( ()=>import('../components/forms/BasicForm'));
const BasicTable = Asyncload( ()=>import('../components/tables/BasicTables'));
const AdvancedTable = Asyncload(()=>import( '../components/tables/AdvancedTables'));
const AsynchronousTable = Asyncload(()=>import( '../components/tables/AsynchronousTable'));
const Echarts = Asyncload(()=>import( '../components/charts/Echarts'));
const Recharts = Asyncload(()=>import( '../components/charts/Recharts'));
const Icons = Asyncload( ()=>import('../components/ui/Icons'));
const Buttons = Asyncload( ()=>import('../components/ui/Buttons'));
const Spins = Asyncload( ()=>import('../components/ui/Spins'));
const Modals = Asyncload(()=>import( '../components/ui/Modals'));
const Notifications = Asyncload(()=>import( '../components/ui/Notifications'));
const Tabs = Asyncload( ()=>import('../components/ui/Tabs'));
const Banners = Asyncload(()=>import( '../components/ui/banners'));
const Drags = Asyncload(()=>import( '../components/ui/Draggable'));

const Gallery = Asyncload(()=>import( '../components/ui/Gallery'));
const BasicAnimations = Asyncload(()=>import( '../components/animation/BasicAnimations'));
const ExampleAnimations = Asyncload(()=>import( '../components/animation/ExampleAnimations'));
const AuthBasic = Asyncload(()=>import( '../components/auth/Basic'));
const RouterEnter = Asyncload(()=>import( '../components/auth/RouterEnter'));
const Bundle= Asyncload(()=>import('../components/widget/Bundle'));
const WysiwygBundle = (props) => (
    <Bundle load={Wysiwyg}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

export default class CRouter extends Component {
  constructor(props) {
        super(props);
        this.state={
                permissions:[ {path:'/app/dashboard/index',component:'Dashboard'},]
            }
    }
    componentWillMount(){
              let permissions = []
         const      permissions2 = 

    setTimeout(()=>{
       this.setState({
            permissions:[ 
                {path:'/app/dashboard/index',component:'Dashboard'},
                {path:'/app/form/basicForm',component:'BasicForm'},
                {path:'/app/table/basicTable',component:'BasicTable'},
                {path:'/app/table/advancedTable',component:'AdvancedTable'},
                {path:'/app/table/asynchronousTable',component:'AsynchronousTable'},
                {path:'/app/chart/echarts',component:'Echarts'},
                {path:'/app/chart/recharts',component:'Recharts'},
                {path:'/app/animation/basicAnimations',component:'BasicAnimations'},
            ]
        })
       
    },1000)

    }
    
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        console.log(11111111111111111)
        console.log(this.props)
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
   
    render() {
        //字符串和组件类的映射
        const json={
            Dashboard,
            BasicForm,
            BasicTable,
            AdvancedTable,
            AsynchronousTable,
            Echarts,
            Recharts,
            BasicAnimations
        }
        // Route  中的 组件变量 必须要隐射一下 才行  c此处应该有aiax
   
        return (
            <Switch>
              
                {
                    this.state.permissions.map((item,key)=>{
                        return (
                            <Route key={key} exact path={item.path} component= {json[item.component]}/>
                            )
                    })
                }
                <Route render={() => <Redirect to="/404" />} />
              
            </Switch>
        )
    }
}


  
                //   <Route exact path="/app/dashboard/index" component={Dashboard} />
                // <Route exact path="/app/form/basicForm" component={BasicForm} />
                // <Route exact path="/app/table/basicTable" component={BasicTable} />
                // <Route exact path="/app/table/advancedTable" component={AdvancedTable} />
                // <Route exact path="/app/table/asynchronousTable" component={AsynchronousTable} />
                // <Route exact path="/app/chart/echarts" component={Echarts} />
                // <Route exact path="/app/chart/recharts" component={Recharts} />

                //  <Route exact path="/app/ui/icons" component={Icons} />
                // <Route exact path="/app/ui/buttons" component={Buttons} />
                // <Route exact path="/app/ui/spins" component={Spins} />
                // <Route exact path="/app/ui/modals" component={Modals} />
                // <Route exact path="/app/ui/notifications" component={Notifications} />
                // <Route exact path="/app/ui/tabs" component={Tabs} />
                // <Route exact path="/app/ui/banners" component={Banners} />
                // <Route exact path="/app/ui/wysiwyg" component={WysiwygBundle} />
                // <Route exact path="/app/ui/drags" component={Drags} />
                // <Route exact path="/app/ui/gallery" component={Gallery} />

                // <Route exact path="/app/animation/basicAnimations" component={BasicAnimations} />
                // <Route exact path="/app/animation/exampleAnimations" component={ExampleAnimations} />

                // <Route exact path="/app/auth/basic" component={AuthBasic} />

                // <Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />

