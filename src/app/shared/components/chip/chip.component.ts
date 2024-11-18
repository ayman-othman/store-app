import { CommonModule } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";
import { FadeColorPipe } from "../../pipes/fade-color/fade-color.pipe";

@Component({
	selector: "chip",
	standalone: true,
	imports: [CommonModule, FadeColorPipe],
	templateUrl: "./chip.component.html",
	styleUrl: "./chip.component.scss",
})
export class ChipComponent {
	public colorHex: InputSignal<string> = input.required();
}
