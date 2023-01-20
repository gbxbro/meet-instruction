import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content, Footer, Header, Sidebar } from '..';
import { fetchInstruction } from '../functions';

type Props = {
    _isShowSidebar: boolean
}

/**
 * Class for main Footer component.
 *
 * @abstract
 */
class Layout extends Component<Props> {
    /**
     * Initializes a new {@code Sidebar} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            instruction: {
                isLoaded: false,
                error: null,
                items: []
            }
        };
    }

    /**
     * Sets keyboard shortcuts for to trigger ToolbarButtons actions.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        fetchInstruction()
            .then(result => this.setState(prev => {
                return {
                    ...prev,
                    instruction: {
                        ...prev.instruction,
                        isLoaded: true,
                        items: result
                    }
                };
            }))
            .catch(error => this.setState(prev => {
                return {
                    ...prev,
                    instruction: {
                        ...prev.instruction,
                        isLoaded: true,
                        error
                    }
                };
            }));
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _isShowSidebar } = this.props;
        const { instruction } = this.state;

        return (
            <div className = { `app${_isShowSidebar ? ' app_indent' : ''}` }>
                <Header />
                <Sidebar instruction = { instruction.items } />
                <main className = 'main'>
                    <Content instruction = { instruction.items } />
                </main>
                <Footer />
            </div>
        );
    }

}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
function mapStateToProps(state) {
    const { isShowSidebar } = state.layout;

    return {
        _isShowSidebar: isShowSidebar
    };
}

export default connect(mapStateToProps)(Layout);
