import React, { useState, useEffect, useCallback } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    OnConnect,
    Node,
    Edge,
    Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import CustomNode, { type CustomNodeProps } from './CustomNode';

const initBgColor = '#c9f1dd';

const nodeTypes = {
    selectorNode: CustomNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    useEffect(() => {
        const onChange: CustomNodeProps['data']['onChange'] = (event) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== '2') {
                        return node;
                    }

                    const color = event.target.value;

                    setBgColor(color);

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            color,
                        },
                    };
                }),
            );
        };

        setNodes([
            {
                id: '1',
                type: 'input',
                data: { label: 'An input node' },
                position: { x: 0, y: 50 },
                sourcePosition: Position.Right,
            },
            {
                id: '2',
                type: 'selectorNode',
                data: { onChange: onChange, color: initBgColor },
                position: { x: 300, y: 50 },
            },
            {
                id: '3',
                type: 'output',
                data: { label: 'Output A' },
                position: { x: 650, y: 25 },
                targetPosition: Position.Left,
            },
            {
                id: '4',
                type: 'output',
                data: { label: 'Output B' },
                position: { x: 650, y: 100 },
                targetPosition: Position.Left,
            },
        ]);

        setEdges([
            {
                id: 'e1-2',
                source: '1',
                target: '2',
                animated: true,
            },
            {
                id: 'e2a-3',
                source: '2',
                target: '3',
                sourceHandle: 'a',
                animated: true,
            },
            {
                id: 'e2b-4',
                source: '2',
                target: '4',
                sourceHandle: 'b',
                animated: true,
            },
        ]);
    }, []);

    const onConnect: OnConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [],
    );

    console.log(nodes, edges);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            style={{ background: bgColor }}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={[1, 1]}
            defaultViewport={defaultViewport}
            fitView
            attributionPosition="bottom-left"
            proOptions={{ hideAttribution: true }}
        >
            <MiniMap
                nodeStrokeColor={(n) => {
                    if (n.type === 'input') return '#0041d0';
                    if (n.type === 'selectorNode') return bgColor;
                    if (n.type === 'output') return '#ff0072';
                    return '#eee';
                }}
                nodeColor={(n) => {
                    if (n.type === 'selectorNode') return bgColor;
                    return '#fff';
                }}
            />
            <Controls />
        </ReactFlow>
    );
};

export default CustomNodeFlow;
