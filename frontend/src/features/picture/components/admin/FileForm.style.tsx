import styled from 'styled-components'

export const FileFormWrapper = styled.div`
  width: 600px;
  margin: auto;
  background: var(--gray-2);
  border-radius: 5px;
  padding: 1.5rem;
`
export const FileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #1475cf;
  height: 300px;
  cursor: pointer;
  border-radius: 5px;
`
export const UploadedRow = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #e9f0ff;
`
export const UploadContent = styled.span`
  display: flex;
  align-items: center;
`
