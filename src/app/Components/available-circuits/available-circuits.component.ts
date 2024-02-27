import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CircuitsService } from 'src/app/Services/circuits.service';
import { countries } from 'countries-list';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-available-circuits',
  templateUrl: './available-circuits.component.html',
  styleUrls: ['./available-circuits.component.css']
})
export class AvailableCircuitsComponent implements OnInit {
  circuits: any = [];
  selectedCircuit: any = '';
  switch: boolean = false;
  countryList: any[];
  token: any;

  //* CIRCUIT FORM
  circuitForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    circuitLength: new FormControl(''),
    laps: new FormControl(''),
    lapKmLength: new FormControl({ value: '', disabled: true }),
  });

  constructor(private CS: CircuitsService, private cookies: CookieService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.token = this.cookies.get("token");

    this.CS.getAllCircuits(this.token).subscribe((result) => {
      this.circuits = result.data.circuits;
    }, (error) => {
      console.log("error", error);
    });

    this.countryList = this.getCountries();


    //! Subscribe to changes in Circuit Length and Laps
    this.circuitForm.get('circuitLength')?.valueChanges.subscribe(() => {
      this.calculateLapKmLength();
    });

    this.circuitForm.get('laps')?.valueChanges.subscribe(() => {
      this.calculateLapKmLength();
    });

  }

  getCountries(): any[] {
    const countriesArray = [];
    for (const code in countries) {
      if (countries.hasOwnProperty(code)) {
        countriesArray.push({ code, name: countries[code].name });
      }
    }
    return countriesArray;
  }

  refreshTable() {
    this.CS.getAllCircuits(this.token).subscribe((result) => {
      this.circuits = result.data.circuits;
    }, (error) => {
      console.log("error", error);
    });
  }

  resetForm() {
    this.circuitForm.reset()
  }

  calculateLapKmLength() {
    const circuitLength = +this.circuitForm.get('circuitLength')?.value;
    const laps = +this.circuitForm.get('laps')?.value;

    if (circuitLength && laps && laps !== 0) {
      const lapKmLength = (circuitLength / laps).toFixed(1);
      this.circuitForm.patchValue({ lapKmLength });
    } else {
      this.circuitForm.patchValue({ lapKmLength: '' });
    }
    return (circuitLength / laps).toFixed(1)
  }

  selectCircuit(circuit: any, index: any) {
    console.log(circuit, index);
    this.selectedCircuit = circuit
    this.switch = true;
    this.circuitForm.patchValue(circuit)
  }

  createCircuit() {
    let circuitToAdd = this.circuitForm.value
    this.CS.createCircuit(circuitToAdd, this.token).subscribe((response) => {
      console.log("Circuits added", response);
      this.showSpinner(1500)
      this.refreshTable()
      
    }, (error) => {
      console.log(error);
    })
    this.resetForm()
  }

  deleteCircuit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: `Are you sure you want to delete? `
      }
    });
    let circuitToDelete = this.selectedCircuit

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.CS.deleteCircuit(circuitToDelete._id, this.token).subscribe(() => {
          console.log('Circuit deleted from DB');
          this.showSpinner(1500)
          this.refreshTable();
        }, (error) => {
          console.log(error.statusText);
        })
      } else {
        console.log("Nothing changed");
      }
    })


    this.resetForm()
    this.switch = false;
  }

  updateCircuit() {
    console.log(this.selectedCircuit);
    let circuitToUpdate = this.selectedCircuit;
    let updatedCircuit = this.circuitForm.value
    this.CS.updateCircuit(circuitToUpdate._id, updatedCircuit, this.token).subscribe(() => {
      this.showSpinner(1500)
      this.refreshTable();
      this.resetForm();
      this.switch = false;
    })
  }

  cancelButton() {
    this.switch = false;
    this.resetForm();
  }


  showSpinner(time:any) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();   
    }, time)  
  }

}



