import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalHelp = (props) => {
    const {
        isOpen,
        onClose,
        // content,
        title,
        // buttonLabel,
        className
    } = props;
    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <Modal isOpen={true} className={className}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <div><h2>Overview</h2>
                        <p></p>
                        <p>An interactive grid presents a set of data in a searchable, customizable report. You can perform numerous operations to limit the records returned, and change the way the data is displayed.</p>
                        <p>Use the Search field to filter the records returned. Click Actions to access numerous options for modifying the report layout, or use the Column Heading menus on displayed columns.</p>
                        <p>Use Report Settings to save your customizations to a report. You can also download the data from the report to an external file or email the data to yourself or others.</p>
                        <p>To learn more, see \"Using Interactive Grids\" in <em>Oracle Application Express End User's Guide</em>.</p>
                        <h2>Reporting Capabilities</h2>
                        <p></p>
                        <p>You can customize the interactive grid to display data in various different ways using the built-in capabilities.</p>
                        <p>Use the Column Heading menus or the Actions menu to determine which columns to display, in what sequence, and freeze columns. You can also define various data filters and sort the data returned.</p>
                        <p>Use the View button (adjacent to the Search field) to access other data views that may have been defined by the application developer. You can also create a chart or view an existing chart.</p>
                        <p><em>Note: Click <strong>Help</strong> in the interactive grid dialogs to obtain more detailed information on the selected function.</em></p>
                        <p></p>
                        <h2>Editing Capabilities</h2>
                        <p></p>
                        <p>You can insert, update, and delete data directly within this interactive grid.</p>
                        <p>Insert a new row by clicking the Add Row button.</p>
                        <p>Edit existing data by double-clicking a specific cell. For larger editing work, click Edit to enter editing mode. In editing mode, you can single-click or use the keyboard to edit specific cells.</p>
                        <p>Use the Change menu to duplicate and delete rows. To enable the Change menu, use the check boxes to select one or more rows.</p>
                        <p>Duplicate a selected row by clicking the Change menu and selecting Duplicate Rows. Delete a selected row by clicking the Change menu and selecting Delete Row.</p>
                        <p></p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/*<Button color="primary" >Do Something</Button>{' '}*/}
                    <Button color="secondary" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalHelp;
