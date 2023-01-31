import { Box } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content, Footer, Header, Sidebar } from '../';
import { fetchInstruction, parseInstruction } from '../functions';


type Props = {

    /**
     * Defines is sidebar is open.
     */
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
            },
            parsedInstruction: {
                isLoaded: false,
                error: null,
                pagination: [],
                items: []
            }
        };
    }

    /**
     * Sets local state (parsedInstruction) after parsing JSON instruction.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidUpdate(prevProps, prevState) {
        const { instruction } = this.state;
        const { parsedInstruction } = prevState;

        if (!parsedInstruction.items.length && instruction.items.length) {
            parseInstruction(instruction.items)
                .then(result => {
                    this.setState(prev => {
                        return {
                            ...prev,
                            parsedInstruction: {
                                ...prev.parsedInstruction,
                                isLoaded: true,
                                pagination: result?.pagination,
                                items: result?.items
                            }
                        };
                    });
                })
                .catch(error => this.setState(prev => {
                    return {
                        ...prev,
                        parsedInstruction: {
                            ...prev.parsedInstruction,
                            isLoaded: true,
                            error
                        }
                    };
                }));
        }
    }

    /**
     * Sets local state (instruction) after fetching JSON instruction.
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
        const { parsedInstruction } = this.state;

        return (
            <div className = { `app${_isShowSidebar ? ' app_indent' : ''}` }>
                <Sidebar instruction = { parsedInstruction.items } />
                <Box className = 'app__inner'>
                    <Header />
                    <Box
                        className = 'app__content'
                        id = 'app__content'>
                        <main className = 'main'>
                            <Content items = { parsedInstruction.items } />
                        </main>
                        <Footer />
                    </Box>
                </Box>
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
    const { isShowSidebar, sidebarActiveItem } = state.layout;

    return {
        _isShowSidebar: isShowSidebar,
        _sidebarActiveItem: sidebarActiveItem
    };
}

export default connect(mapStateToProps)(Layout);
