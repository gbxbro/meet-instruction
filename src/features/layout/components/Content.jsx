import { Container } from '@mui/material';
import React, { Component } from 'react';

type Props = {
    isShowDrawer: Boolean,
};

/**
 * Class for layout's Content component.
 *
 * @abstract
 */
class Content extends Component<Props> {
    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <Container>
                Content
            </Container>
        );
    }
}

export default Content;
