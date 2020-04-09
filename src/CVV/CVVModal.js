import React from "react";

import { Modal, } from "@patternfly/react-core";

export default function CVVModal ({title, open, onClose, id}) {

    return (
        <Modal title={title} isOpen={open} onClose={onClose}>
            Hey guys, evan here with another weekend update
        </Modal>
    );
}