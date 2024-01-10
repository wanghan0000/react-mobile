import React from 'react';
import { TabBar, Badge } from '@arco-design/mobile-react';
import {
    IconUser,
    IconHome,
    IconSetting,
    IconNotice,
    IconStarFill,
    IconStar,
} from '@arco-design/mobile-react/esm/icon';
import { useNavigate } from 'react-router';
export default function TabBarBottom(props: any) {
    const navigate = useNavigate()
    const { className } = props;
    const tabs = [
        {
            title: 'Home',
            icon: <IconHome />,
        },
        {
            title: 'Mine',
            icon: (active: any) => (active ? <IconStarFill /> : <IconStar />),
        },
        {
            child: (
                <img
                    src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/tabbar-demo-img.png"
                    style={{ width: '48px', height: '40px' }}
                />
            ),
        },
        {
            title: (active: any) => (active ? 'Your Notice' : 'My Notice'),
            icon: <IconNotice />,
        },
        {
            title: 'Settings',
            icon: <IconSetting />,
        },
    ];

    const handleChange = (index:number)=>{
        if(index === 0) {
            navigate('/main/home')
        }else if(index === 1) {
            navigate('/main/mine')
        }else if(index === 2) {
            navigate('/main/game')
        }else if(index === 3) {
            navigate('/main/notice')
        }else if(index === 4){
            navigate('/main/setting')
        }
    }

    return (
        <TabBar
            className={className}
            activeCustomStyle={{ color: '#FF5722' }}
            dataSource={tabs}
            fixed={false}
            onChange={handleChange}
        />
    );
}