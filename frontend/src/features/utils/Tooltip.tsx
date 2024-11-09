import type { FC } from 'react'
import styled from 'styled-components'

const ToolTipContainer = styled.span`
    position: relative;

    &:hover > .tip {
        display: block;
    }

    & > .tip {
        position: absolute;
        display: none;
        h4 {
            font-size: 0.8rem;
            color: #FFFFFF;
        }
        p {
            font-size: 0.7rem;
        }

        background: #1F2531;
        /* opacity: 0.9; */
        border-radius: 5px;
        color: #FFFFFF;
        padding: 12px 8px;
        /* width: 100%; */
        min-width: 100px;
    }

    & > .tip::after {
        content: "";
        position: absolute;
        opacity: 0.9;
        top: -10px;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color:  transparent transparent black transparent;
    }
`
interface Props {
    children: React.ReactNode
    tip: JSX.Element
}

const Tooltip: FC<Props> = ({ children, tip }) => {
    return <ToolTipContainer>
        {children}
        <span className="tip">{tip}</span>
    </ToolTipContainer>
}

export default Tooltip