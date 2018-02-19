import React, { Component } from 'react';
import { ScrollView, View, InteractionManager } from 'react-native';
import Menu1 from './Menu1';
import Menu2 from './Menu2';

const menu1Width = 300;
const menu1scrollAwayFactor = 1.5;
const menu2Width = 200;


class MenuList extends React.PureComponent {

    state = {
        //languangeId: 2,
        menus: this.props.data.menuTrees[global.language].menuTree, // promeniti lang u dinamicki (ovo je samo english)
        selected: this.props.selected || 0,
        pages: this.props.data.pages,
        fromObj: {}
    };


    componentWillMount() {
        // this.setState({menus: this.props.data.menuTrees[this.props.a-1].menuTree});
        this.setState({
            fromObj: global.globalJson.menus[global.language].menu.find(o =>
                o.menuId == this.props.from
            )
        });
    }

    chooseSelected(m) {
        if (m.parentId == 0) {
            this.state.menus.map((cale, i) => {
                if (cale.menuId == m.menuId) {
                    this.setState({ selected: i })
                }
            })
        }
        else {
            let a = global.globalJson.menus[global.language].menu.find(x => x.menuId == m.parentId);
            this.chooseSelected(a)
        }
    }

    componentDidUpdate() {
        this.refs._scrollView2.scrollTo({ y: 0, x: 0, animated: true });
    }

    renderMenus1() {

        return this.state.menus.map((menu, i) =>
            <Menu1 onPress={() => this.setState({ selected: i })}
                isPressed={this.state.selected == i ? true : false}
                key={menu.menuId}
                menu1={menu}
            />
        );
    }

    renderMenus2() {

        if (this.state.menus[this.state.selected]) {
            if (this.state.menus[this.state.selected].children) {
                return this.state.menus[this.state.selected].children.map(menu =>

                    <Menu2
                        key={menu.menuId}
                        menu2={menu}
                        pages={this.state.pages}
                        from={this.props.from}
                        isPressed={this.props.from == menu.menuId ? true : false}
                        selected={this.state.selected}
                    />
                );
            }
        }
    }

    findMenu(menuIdS) {
        let menus = global.globalJson.menuTrees[global.language].menuTree;
        let found = {};
    
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].menuId == menuIdS) { found = menus[i]; break; }
          else {
            if (menus[i].children)
              for (let j = 0; j < menus[i].children.length; j++) {
                if (menus[i].children[j].menuId == menuIdS) { found = menus[i].children[j]; break; }
                else {
                  if (menus[i].children[j].children) {
                    for (let k = 0; k < menus[i].children[j].children.length; k++) {
                      if (menus[i].children[j].children[k].menuId == menuIdS) { found = menus[i].children[j].children[k]; break; }
                    }
                  }
                }
              }
          }
        }
        return found;
      }



    findMenu2Index = (m, searchMenu) => {
        if (m.parentId == 0) {
            m = this.findMenu(m.menuId);
            return m.children.findIndex(m2 => m2.menuId == searchMenu.menuId);
            
        }
        else {
            let a = global.globalJson.menus[global.language].menu.find(x => x.menuId == m.parentId);
            return this.findMenu2Index(a, m);
        }
    }

    componentDidMount() {
        this.chooseSelected(this.state.fromObj);
        let menu2Obj = this.findMenu(this.props.from);
        let menu2Index = this.findMenu2Index(menu2Obj, menu2Obj);
        setTimeout(() => {
            this.refs._scrollView1.scrollTo({ y: 0, x: this.state.selected * menu1Width - (menu1Width * menu1scrollAwayFactor), animated: true });
            this.refs._scrollView2.scrollTo({ y: 0, x: menu2Index*menu2Width, animated: true });
        }, 1)
    }

    render() {

        return (

            <View style={styles.mainCont}>
                <ScrollView ref={'_scrollView1'} horizontal={true} style={styles.menu1Container} showsHorizontalScrollIndicator={false}>
                    {this.renderMenus1()}
                </ScrollView>

                <ScrollView
                    ref={'_scrollView2'}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{ flexDirection: 'row' }}
                >
                    {this.renderMenus2()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    menu1Container: {
        flexDirection: 'row',

    },
    mainCont: {
        backgroundColor: 'white',
        paddingBottom: 0,
        position: 'relative',
        height: '100%',
        width: '100%',
        //bottom: '7%'
    }
}


export default MenuList;
