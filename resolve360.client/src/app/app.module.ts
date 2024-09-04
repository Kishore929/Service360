import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component'; // Adjust path if needed

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Include FormsModule in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
