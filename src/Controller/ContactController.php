<?php
/**
 * ContactController.php - Main Controller
 *
 * Main Controller Contact Module
 *
 * @category Controller
 * @package Contact
 * @author Verein onePlace
 * @copyright (C) 2020  Verein onePlace <admin@1plc.ch>
 * @license https://opensource.org/licenses/BSD-3-Clause
 * @version 1.0.0
 * @since 1.0.0
 */

declare(strict_types=1);

namespace OnePlace\Contact\Controller;

use Application\Controller\CoreEntityController;
use Application\Model\CoreEntityModel;
use OnePlace\Contact\Model\Contact;
use OnePlace\Contact\Model\ContactTable;
use Laminas\View\Model\ViewModel;
use Laminas\Db\Adapter\AdapterInterface;

class ContactController extends CoreEntityController {
    /**
     * Contact Table Object
     *
     * @since 1.0.0
     */
    protected $oTableGateway;

    /**
     * ContactController constructor.
     *
     * @param AdapterInterface $oDbAdapter
     * @param ContactTable $oTableGateway
     * @since 1.0.0
     */
    public function __construct(AdapterInterface $oDbAdapter,ContactTable $oTableGateway,$oServiceManager) {
        $this->oTableGateway = $oTableGateway;
        $this->sSingleForm = 'contact-single';
        parent::__construct($oDbAdapter,$oTableGateway,$oServiceManager);

        if($oTableGateway) {
            # Attach TableGateway to Entity Models
            if(!isset(CoreEntityModel::$aEntityTables[$this->sSingleForm])) {
                CoreEntityModel::$aEntityTables[$this->sSingleForm] = $oTableGateway;
            }
        }
    }

    /**
     * Contact Index
     *
     * @since 1.0.0
     * @return ViewModel - View Object with Data from Controller
     */
    public function indexAction() {
        # You can just use the default function and customize it via hooks
        # or replace the entire function if you need more customization
        if(CoreEntityController::$oSession->oUser->hasPermission('admin', 'OnePlace-Contact-Controller-ContactController')) {
            return $this->generateIndexView('contact');
        } else {
            return $this->generateIndexView('contact', [], ['created_by' => CoreEntityController::$oSession->oUser->getID()]);
        }
    }

    /**
     * Contact Add Form
     *
     * @since 1.0.0
     * @return ViewModel - View Object with Data from Controller
     */
    public function addAction() {
        /**
         * You can just use the default function and customize it via hooks
         * or replace the entire function if you need more customization
         *
         * Hooks available:
         *
         * contact-add-before (before show add form)
         * contact-add-before-save (before save)
         * contact-add-after-save (after save)
         */

        $sMode = $this->params()->fromRoute('id', '');
        if($sMode == 'company') {
            return $this->generateAddView('contact','company-single','','view',0,[],'Company successfully created',['is_company' => 1]);
        } else {
            return $this->generateAddView('contact');
        }
    }

    /**
     * Contact Edit Form
     *
     * @since 1.0.0
     * @return ViewModel - View Object with Data from Controller
     */
    public function editAction() {
        /**
         * You can just use the default function and customize it via hooks
         * or replace the entire function if you need more customization
         *
         * Hooks available:
         *
         * contact-edit-before (before show edit form)
         * contact-edit-before-save (before save)
         * contact-edit-after-save (after save)
         */

        $iContactID = $this->params()->fromRoute('id', '');

        $oContact = $this->oTableGateway->getSingle($iContactID);

        if($oContact->isCompany()) {
            return $this->generateEditView('contact','company-single', '', 'view', 0, [],'','contact-single');
        } else {
            return $this->generateEditView('contact');
        }
    }

    /**
     * Contact View Form
     *
     * @since 1.0.0
     * @return ViewModel - View Object with Data from Controller
     */
    public function viewAction() {
        /**
         * You can just use the default function and customize it via hooks
         * or replace the entire function if you need more customization
         *
         * Hooks available:
         *
         * contact-view-before
         */

        $iContactID = $this->params()->fromRoute('id', '');

        $oContact = $this->oTableGateway->getSingle($iContactID);

        if($oContact->isCompany()) {
            return $this->generateViewView('contact','company-single', 'contact-single');
        } else {
            return $this->generateViewView('contact');
        }
    }
}
