import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Popover, Input } from 'antd';
import 'antd/dist/antd.css';

import Pickr from './pickr.styled';
import StyledPickr from './pickr.styled-jsx';
import ColorInputAddon from './color-input-addon';

export default class App extends React.Component {
  render() {
    return (
      <Row type='flex' justify='space-around' align='middle' gutter={16}>
        <Col span={8}>
          <Pickr withSwatch />
        </Col>
        <Col span={8}>
          <Input
            style={{ margin: '0 15px' }}
            id='bannerColor'
            type='text'
            name='bannerColour'
            addonAfter={
              <Popover content={<StyledPickr withSwatch />}>
                <ColorInputAddon color='#1A237E' />
              </Popover>
            }
            defaultValue={'#1A237E'}
          />
        </Col>
      </Row>
    );
  }
}

const rootDOM = document.getElementById('root');
rootDOM && ReactDOM.render(<App />, rootDOM);
