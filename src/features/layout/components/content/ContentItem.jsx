import React, { useMemo } from 'react';
import { Element } from 'react-scroll';

type Props = {

    /**
     * Instruction from parsed JSON.
     */
    item: Object,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
}

const ContentItem = ({ item }: Props) => {
    const items = useMemo(() => item?.items || [], [ item?.items ]);
    const id = useMemo(() => item?.id || [], [ item?.id ]);

    if (items.length > 0) {
        return (
            <>
                <div className = 'content__wrapper'>
                    <Element name = { id.length && id.join('.') }>
                        <h1 className = 'content__title'>
                            {id.length && `${id.map(i => i + 1).join('.')}. `}
                            {item?.title}
                        </h1>
                        <div
                            className = 'content__markdown'
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML = {{
                                __html: item?.content
                            }} />
                    </Element>
                </div>
                {items.map((innerItem, innerIndex) => (
                    <ContentItem
                        item = { innerItem }
                        key = { innerIndex } />
                ))}
            </>
        );
    }

    return (
        <div className = 'content__wrapper'>
            <Element name = { id.length && id.join('.') }>
                <h1 className = 'content__title'>
                    {id.length && `${id.map(i => i + 1).join('.')}. `}
                    {item?.title}
                </h1>
                <div
                    className = 'content__markdown'
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML = {{ __html: item?.content }} />
            </Element>
        </div>
    );
};

export default ContentItem;
