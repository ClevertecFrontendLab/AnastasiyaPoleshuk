import { Drawer, Table, Tag } from 'antd';
import './TariffDrawer.scss';
import { CheckCircleFilled, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import CONSTANTS from '@utils/constants';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const dataSource = [
    {
        key: '0',
        name: '',
        free: (
            <Tag color='default' style={{ borderRadius: 2, border: 'none', padding: '4px 8px' }}>
                FREE
            </Tag>
        ),
        pro: (
            <Tag color='processing' style={{ borderRadius: 2, border: 'none', padding: '4px 8px' }}>
                PRO
            </Tag>
        ),
    },
    {
        key: '1',
        name: 'Статистика за месяц',
        free: <CheckCircleFilled />,
        pro: <CheckCircleFilled />,
    },
    {
        key: '2',
        name: 'Статистика за все время',
        free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
        pro: <CheckCircleFilled />,
    },
    {
        key: '3',
        name: 'Совместные тренировки',
        free: <CheckCircleFilled />,
        pro: <CheckCircleFilled />,
    },
    {
        key: '4',
        name: 'Участие в марафонах',
        free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
        pro: <CheckCircleFilled />,
    },
    {
        key: '5',
        name: 'Приложение IOS',
        free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
        pro: <CheckCircleFilled />,
    },
    {
        key: '6',
        name: 'Приложение Android',
        free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
        pro: <CheckCircleFilled />,
    },
    {
        key: '7',
        name: 'Индивидуальный Chat GPT',
        free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
        pro: <CheckCircleFilled />,
    },
];

const columns = [
    {
        title: '',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '',
        dataIndex: 'free',
        key: 'free',
    },
    {
        title: '',
        dataIndex: 'pro',
        key: 'pro',
    },
];

export const TariffDrawer = () => {
    const { setTariffDrawerStatus, isTariffDrawerOpen } = useContext(AppContext);

    const closeDrawer = () => {
        setTariffDrawerStatus(false);
    };

    return (
        <Drawer
            title={<h4 className='tariff-drawer__title'>Сравнить тарифы</h4>}
            styles={{
                header: { borderBottom: 'none', marginBottom: 40 },
                body: { padding: '0 24px 24px 24px' },
            }}
            width={408}
            placement={window.innerWidth > 360 ? 'right' : 'bottom'}
            open={isTariffDrawerOpen}
            closable={false}
            destroyOnClose={true}
            mask={false}
            maskClosable={false}
            className='tariff-drawer'
            data-test-id='modal-drawer-right'
            extra={
                <CloseOutlined
                    onClick={closeDrawer}
                    style={{ color: '#8c8c8c' }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                showHeader={false}
                rowClassName='tariff-advantages__rows'
            />
        </Drawer>
    );
};
