import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export type CustomNodeProps = {
    data: {
        color: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    isConnectable: boolean;
};

const CustomNode = memo(({ data, isConnectable }: CustomNodeProps) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div>
                Custom Color Picker Node: <strong>{data.color}</strong>
            </div>
            <input className="nodrag" type="color" onChange={data.onChange} defaultValue={data.color} />
            <Handle type="source" position={Position.Right} id="a" isConnectable={isConnectable} />
            <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
        </>
    );
});

export default CustomNode;
