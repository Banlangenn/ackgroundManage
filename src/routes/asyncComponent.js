/**
 * 异步加载组件
 * 使用方法
 * 其中：Page1 定义组件名称
 *    webpackChunkName: "Page1"   定义  Chunk名称  后边跟的 引入路径
 *    {(Page1) => <Page1 {...props}/>}  我也不知道干嘛的 0.0
 */
// 方法一使用
//  const Page1 = (props) => (
//  <Bundle load={() => import(/* webpackChunkName: "Page1" */ './edushi/page1.jsx')}>
// {(Page1) => <Page1 {...props}/>}
// </Bundle>
// );
// 方法二使用
// const Search = asyncComponent(() => import(/* webpackChunkName: "search" */ "./containers/Search/Search")) 使用


/**
 * 如果你的异步加载组件有导入样式，请把样式移植到全局js文件导入。  css他会打包到异步组件中去 这部分chunk没有加载的时候css 无效
 */
import React from 'react'
export  class Bundle  extends React.Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        })

        props.load().then((mod)=> {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null//(Page1) => <Page1 {...props}
    }
}
//
// export default Bundle;


// c尝试把上班奶奶封装成高阶组件lo

export const Asyncload=loadComponent=>(


  class Bundle  extends React.Component {
      // this.props = {load:()={}}
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        Mod: null
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== loadComponent()) {
            this.load(nextProps)
        }
    }

    load(props) {//load:()={}
        this.setState({
            Mod: null
        })

        loadComponent().then((mod)=> {
            this.setState({
                // handle both es imports and cjs
                Mod: mod.default ? mod.default : mod
            })
        }).catch((err) => {
            console.error(`Cannot load component in <AsyncComponent />`);
            throw err;
        });
    }

    render() {
        const { Mod } = this.state;
        // console.log(Mod)
        return this.state.Mod ?  <Mod {...this.props} /> : null//(Page1) => <Page1 {...props}
    }
}

)






export  const AsyncComponent = loadComponent => (
    class asyncComponent extends React.Component {
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
);
// const Search = asyncComponent(() => import(/* webpackChunkName: "search" */ "./containers/Search/Search")) 使用
// export default asyncComponent;