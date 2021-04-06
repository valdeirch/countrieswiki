import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    p {
        margin: 0;
        padding: 0;

        font-size: 36px;
        color: white;
        margin-left: 10px;
    }

    @media(max-width: 800px) {
        p {
            font-size: 20px
        }
    }
`