
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { SelectButton } from 'primereact/selectbutton';
import { NodeService } from './service/NodeService';

export default function AllRecordes() {
    const [nodes, setNodes] = useState([
        {
            key: '0',
            data: { name: 'Documents', size: '75kb', type: 'Folder' },
            children: [
                {
                    key: '0-0',
                    data: { name: 'Work', size: '55kb', type: 'Folder' },
                    children: [
                        { key: '0-0-0', data: { name: 'Expenses.doc', size: '30kb', type: 'Document' } },
                        { key: '0-0-1', data: { name: 'Resume.doc', size: '25kb', type: 'Document' } }
                    ]
                },
                {
                    key: '0-1',
                    data: { name: 'Home', size: '20kb', type: 'Folder' },
                    children: [
                        { key: '0-1-0', data: { name: 'Invoices.txt', size: '20kb', type: 'Text' } }
                    ]
                }
            ]
        },
        {
            key: '1',
            data: { name: 'Pictures', size: '150kb', type: 'Folder' },
            children: [
                { key: '1-0', data: { name: 'barcelona.jpg', size: '90kb', type: 'Picture' } },
                { key: '1-1', data: { name: 'primeui.png', size: '30kb', type: 'Picture' } },
                { key: '1-2', data: { name: 'optimusprime.png', size: '30kb', type: 'Picture' } }
            ]
        }
    ]);

    // const [nodes, setNodes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filterMode, setFilterMode] = useState('lenient');
    const [filterOptions] = useState([
        { label: 'Lenient', value: 'lenient' },
        { label: 'Strict', value: 'strict' }
    ]);

    // useEffect(() => {
    //     NodeService.getTreeTableNodes().then((data) => setNodes(data));
    // }, []);

    const getHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </IconField>
            </div>
        );
    };

    let header = getHeader();

    return (
        <div className="card">
            <div className="flex justify-content-center mb-4">
                <SelectButton value={filterMode} onChange={(e) => setFilterMode(e.value)} options={filterOptions} />
            </div>
            <TreeTable value={nodes} globalFilter={globalFilter} header={header} filterMode={filterMode} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander filter filterPlaceholder="Filter by name"></Column>
                <Column field="size" header="Size" filter filterPlaceholder="Filter by size"></Column>
                <Column field="type" header="Type" filter filterPlaceholder="Filter by type"></Column>
            </TreeTable>
        </div>
    )
}
        