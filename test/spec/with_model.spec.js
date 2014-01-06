describeMixin('lib/with_model', function () {
    'use strict';

    describe('regular setup', function () {
        beforeEach(function () {
            setupComponent();
        });

        it('should have a model', function () {
            expect(this.component.model).toBeTruthy();
        });
    });
});
