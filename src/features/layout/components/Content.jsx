import { Container } from '@mui/material';
import React, { Component } from 'react';

import { parseInstruction } from '../functions';

type Props = {

    /**
     * Instruction.
     */
    instruction: Array<Object>,
}

/**
 * Class for layout's Content component.
 *
 * @abstract
 */
class Content extends Component<Props> {
    /**
     * Initializes a new {@code Sidebar} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            pages: []
        };
    }

    /**
     * Sets keyboard shortcuts for to trigger ToolbarButtons actions.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        const { instruction } = this.props;

        parseInstruction(instruction)
            .then(res => console.log('xx', res));

        // this._getItems(instructions)
        // .then(result => console.log('RESULT', result));
    }

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
